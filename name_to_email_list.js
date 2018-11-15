const nameToList = (first, last, companyDomain) => {
	const emailList = [
		`${first}@${companyDomain}`,
		`${first}.${last}@${companyDomain}`,
		`${last}.${first}@${companyDomain}`,
		`${last}${first}@${companyDomain}`,
		`${first}.${last.charAt(0)}@${companyDomain}`,
		`${first}${last.charAt(0)}@${companyDomain}`,
		`${first.charAt(0)}${last}@${companyDomain}`,
		`${first.charAt(0)}${last.charAt(0)}@${companyDomain}`,
		`${first.charAt(0)}.${last.charAt(0)}@${companyDomain}`,
		`${first}${last.slice(0,3)}@${companyDomain}`,
		`${first.charAt(0)}${last.slice(0,3)}@${companyDomain}`,
		`${first.slice(0,3)}${last.slice(0,3)}@${companyDomain}`
	]
	console.log("Email List Compiled");
	return emailList
}

module.exports.nameToList = nameToList;