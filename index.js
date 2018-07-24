const LG = require('./name_to_email_list');
const keys = require('./keys');
const hubspot = require('./hubspot');
const readline = require('readline');

let first,last,domain,emails, index=0;

// Neverbounce for email verification
const NeverBounce = require('neverbounce')({
    apiKey: keys.NeverBounce.USERNAME,
    apiSecret: keys.NeverBounce.SECRET_KEY
});

//Readline Setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Recuresively goes through email list until one return code 0 (valid)
async function testEmail(email){
    try {
        const response = await NeverBounce.single.verify(email);
        if(response.is(0)){
            console.log(`${email} is valid, creating contact`);
            emailFound(first, last, email);
        } else {
            console.log(`${email} is not valid`);
            index++
            if(index < emails.length){
              testEmail(emails[index]); //Recursive email test until correct email is found  
            } else {
                console.log("No valid emails found");
            }
        }
    } catch(error){
        console.log(error)
    }
}

//will prompt user for command line input, parse input, and start email testing
function getInput(){
    rl.question('Input Format - First Last Domain: ', (response) => {
        response = response.split(" ")
        first = response[0];
        last = response[1];
        domain = response[2];

        rl.close();

        emails = LG.nameToList(first, last, domain);
        index=0
        testEmail(emails[index]);
    });
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






