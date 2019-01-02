### Simple library to help you find contact information for an individual within a company, and add them to your hubspot contact list

#### Requirements:

1. Hubspot account, and a HAPI KEY from the developer section
2. Clearbit account (https://clearbit.com) and API KEY
3. NeverBounce account (https://neverbounce.com), USERNAME and SECRET_KEY

##### These keys need to be copied into the keys.js file

##### To run `node index.js` 
##### For each contact
* Input a first name, last name, and company name
* The application will first try to determine the proper company domain using Clearbit, if it cannot, you will need to provide it
* It will then proceed to validate and email address leveraging NeverBounce
* Once a valid email, or a catchall email is found, the application will fire off the contact information to huspot and create a contact for you
