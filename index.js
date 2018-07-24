const listGen = require('./name_to_email_list');
const keys = require('./keys');
const hubspot = require('./hubspot');

// Argument variable
let first = process.argv[2]
let last = process.argv[3]
let companyDomain = process.argv[4]

//format names into possible emails list
let emails = listGen.nameToList(first, last, companyDomain);


const NeverBounce = require('neverbounce')({
    apiKey: keys.NeverBounce.USERNAME,
    apiSecret: keys.NeverBounce.SECRET_KEY
});

const testEmail = (email) => {
	NeverBounce.single.verify(email).then(
    function(result) {
    	if(result.is(0)){
    		//email returned code zero ie is valid, create hubspot contact
    		let contact = hubspot.createContact(first, last, email);
    		console.log(contact);
    	} else {
            console.log(`${email} is not valid`);
        }
    },
    function(error) {
        // errors will bubble up through the reject method of the promise.
        console.log(error);
        // you'll want to console.log them otherwise it'll fail silently
    }
	);
}

for (var i = emails.length - 1; i >= 0; i--) {
	testEmail(emails[i]);
}




