const axios = require('axios');
const keys = require('./keys');

const API_URL = "https://api.hubapi.com/contacts/v1/contact/?hapikey="

const createContact = (first, last, email) => {
	const props = {
		properties: [
			{
				property: "email",
				value: email
			},
			{
				property: "firstname",
				value: first
			}, 
			{
				property: "lastname",
				value: last
			}
		]
	}

	return props
}

module.exports.createContact = createContact;


