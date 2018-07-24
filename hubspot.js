const axios = require('axios');
const keys = require('./keys');

const API_URL = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${keys.Hubspot.HAPI_KEY}`

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

async function pushContact(props) {
	try{
		const response = await axios.post(API_URL, props);
		console.log(response);
	} catch(error){
		console.log(error);
	}
}

const createContact = (first, last, email) => {
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
	pushContact(props);
}



module.exports.createContact = createContact;


