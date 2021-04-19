function getFunctionConstructorArguments(/** @type {string} */ content) {
	const splitIndex = content.indexOf(')');

	const args = content.slice(11, splitIndex).split(',')

	args.push(content.slice(splitIndex + 2, -1))

	return args
}

exports.getFunctionConstructorArguments = getFunctionConstructorArguments
