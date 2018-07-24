const nameToList = (first, last, companyDomain) => {
	const emailList = [
		`${first}@${companyDomain}`,
		`${first}.${last}@${companyDomain}`,
		`${first}.${last.charAt(0)}@${companyDomain}`,
		`${first}${last.charAt(0)}@${companyDomain}`,
		`${first.charAt(0)}${last}@${companyDomain}`,
		`${first.charAt(0)}${last.charAt(0)}@${companyDomain}`,
		`${first.charAt(0)}.${last.charAt(0)}@${companyDomain}`
	]
	return emailList
}

module.exports.nameToList = nameToList;