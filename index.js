const listGen = require('./name_to_email_list');
const keys = require('./keys');
const hubspot = require('./hubspot');

// Neverbounce for email verification
const NeverBounce = require('neverbounce')({
    apiKey: keys.NeverBounce.USERNAME,
    apiSecret: keys.NeverBounce.SECRET_KEY
});

async function testEmail(email){
    try {
        const response = await NeverBounce.single.verify(email);
        if(response.is(0)){
            console.log(`${email} is valid, creating contact`);
            hubspot.createContact(first, last, email)
        } else {
            console.log(`${email} is not valid`);
            index++
            testEmail(emails[index]);
        }
    } catch(error){
        console.log(error)
    }
}

// Argument variable
let first = process.argv[2];
let last = process.argv[3];
let companyDomain = process.argv[4];
let index = 0;

//format names into possible emails list
let emails = listGen.nameToList(first, last, companyDomain);


testEmail(emails[index]);




