const LG = require('./name_to_email_list');
const keys = require('./keys');
const hubspot = require('./hubspot');
const readline = require('readline');
const clearbit = require('clearbit')(keys.Clearbit.API_KEY);

let first,last,domain,emails, index=0;

// Neverbounce for email verification
const NeverBounce = require('neverbounce')({
    apiKey: keys.NeverBounce.USERNAME,
    apiSecret: keys.NeverBounce.SECRET_KEY
});

const NameToDomain = clearbit.NameToDomain;

function runCheck(){
    emails = LG.nameToList(first, last, domain);
    index=0
    console.log("Checking emails");
    testEmail(emails[index]);
}

//will prompt user for command line input, parse input, and start email testing
function getInput(){
    //Readline Instantiation
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Input Format - First Last Company: ', (response) => {
        response = response.split(" ")
        first = response[0];
        last = response[1];
        company = response.slice(2, response.length).join(" ");

        rl.close();
        
        console.log("Input recieved, Fetching Company Domain");

        //Clearbit API call to retrieve company domain from name
        NameToDomain.find({name: company})
          .then(function (result) {
            console.log("Domain found");
            domain = result.domain
            runCheck();
          })
          .catch(NameToDomain.NotFoundError, function (err) {
            console.log("Domain not found")
            
            // Create new readline instance, assume control of input and output, prompt for manual domain entry
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });

            rl.question('Enter Domain: ', (response) => {
                domain = response;

                rl.close()
                runCheck();
            })
          })
          .catch(function (err) {
            console.log('Bad/invalid request, unauthorized, Clearbit error, or failed request');
          });

    });
}

function next(){
    index++
    if(index < emails.length){
      testEmail(emails[index]); //Recursive email test until correct email is found  
    } else {
        console.log("No valid emails found");
        getInput();
    }    
}

//Recuresively goes through email list until one return code 0 (valid)
async function testEmail(email){
    try {
        const response = await NeverBounce.single.verify(email);
        if(response.is(0)){
            console.log(`${email} is valid, creating contact`);
            emailFound(first, last, email);
        } else if(response.is(3)){
					console.log(`${email} is catchall*** Creating contact`);
					emailFound(first, last, email);
				}
        else {
            console.log(`${email} is not valid`);
            next();
        }
    } catch(error){
        console.log(error)
    }
}

//Handles async call to hubspot to create contact props and push to Hubspot online
async function emailFound(f, l, e){
    try{
        const res = await hubspot.createContact(f, l, e);
        if(res){
            getInput(); //restarts the cycle
        }
    } catch(error){
        console.log(error);
    }
}

getInput();






