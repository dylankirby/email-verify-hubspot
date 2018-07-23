const nameToList = (first, last, companyDomain) => {
	const emailList = [
		`${first}@${companyDomain}`,
		`${first}.${last}@${companyDomain}`,
	]

	return emailList
}

module.exports.nameToList = nameToList;