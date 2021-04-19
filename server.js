const { compileMdx } = require('./lib/compileMdx.js')
const { minifyJs } = require("./lib/minifyJS.js")
const { getFrontmatter } = require('./lib/getFrontmatter.js')
const { getFunctionConstructorArguments } = require('./lib/getFunctionConstructorArguments.js')

function getConfig(init) {
	const config = {}

	config.components = typeof init === 'object' && init !== null ? { ...init.components } : {}
	config.path = 'path' in init ? String(opts.path) : ''
	config.remarkPlugins = Array.isArray(init.remarkPlugins) ? [ ...init.remarkPlugins] : []
	config.rehypePlugins = Array.isArray(init.rehypePlugins) ? [ ...init.rehypePlugins] : []

	return config
}

/** @type {import('./server').createMDXContentFromString} */
async function createMDXContentFromString(/** @type {string} */ content, /** @type {{}} */ init = null) {
	content = content == null ? '' : String(content)
	init = typeof init === 'object' && init || {}

	const config = getConfig(init)
	const parsed = getFrontmatter(content)

	config.data = parsed.data
	config.content = parsed.content

	const compiled = await compileMdx(config)
	const minified = await minifyJs(compiled)

	parsed.arguments = getFunctionConstructorArguments(minified)

	return parsed
}

/** @type {import('./server').createMDXContentFromFile} */
async function createMDXContentFromFile(/** @type {string} */ path, /** @type {{}} */ init = null) {
	const { readFile } = require('fs').promises
	const content = await readFile(path, 'utf8')
	const result = createMDXContentFromString(content, init)
	result.path = path

	return result
}

function fromString(/** @type {string} */ content) {
	return getFrontmatter(content)
}

async function fromFile(/** @type {string} */ path) {
	const { readFile } = require('fs').promises
	const content = await readFile(path, 'utf8')
	const result = getFrontmatter(content)
	result.path = path

	return fromString(content)
}

function fromFileSync(/** @type {string} */ path) {
	const { readFileSync } = require('fs')
	const content = readFileSync(path, 'utf8')
	const result = getFrontmatter(content)
	result.path = path

	return fromString(content)
}

exports.createMDXContent = createMDXContentFromString
exports.createMDXContentFromString = createMDXContentFromString

exports.createMDXContentFromFile = createMDXContentFromFile

exports.readMDXDataFrom = fromString
exports.readMDXDataFromString = fromString

exports.readMDXDataFromFile = fromFile

exports.readMDXDataFromFileSync = fromFileSync
