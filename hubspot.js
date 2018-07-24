const axios = require('axios');
const keys = require('./keys');

const API_URL = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${keys.Hubspot.HAPI_KEY}`

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//async function call to hubspot api to create contact
async function createContact(first, last, email) {
	
	const props = {
		properties: [
			{
				property: "email",
				value: email
			},
			{
				property: "firstname",
				value: first.capitalize()
			}, 
			{
				property: "lastname",
				value: last.capitalize()
			}
		]
	}

	try{
		const response = await axios.post(API_URL, props);
		const {status} = response;
		if(status == 200){
			console.log(`Contact Created`);
			return true;
		} else {
			console.log(`API returned status code: ${status}`);
			return false;
		}
	} catch(error){
		console.log(error);
	}
}



module.exports.createContact = createContact;


