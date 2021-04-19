const { getFrontmatter } = require('./lib/getFrontmatter.js')

function fromString(/** @type {string} */ content) {
	return getFrontmatter(content)
}

async function fromFile(/** @type {string} */ path) {
	const { readFile } = require('fs').promises
	const content = await readFile(path)
	const result = getFrontmatter(content)
	result.path = path

	return fromString(content)
}

function fromFileSync(/** @type {string} */ filename) {
	const { readFileSync } = require('fs')
	const content = readFileSync(filename)
	const result = getFrontmatter(content)
	result.path = path

	return fromString(content)
}

exports.from = fromString
exports.fromString = fromString
exports.fromFile = fromFile
exports.fromFileSync = fromFileSync
