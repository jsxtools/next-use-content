const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkMdx = require('remark-mdx')
const footnotes = require('remark-footnotes')
const squeeze = require('remark-squeeze-paragraphs')
const minifyWhitespace = require('rehype-minify-whitespace')
const { mdxAstToMdxHast } = require('./mdxAstToMdxHast.js')
const { mdxHastToJsx } = require('./mdxHastToJsx.js')

function createMdxAstCompiler(config) {
	let compiler = unified()

	compiler = compiler.use(remarkParse)
	compiler = compiler.use(remarkMdx)
	compiler = compiler.use(footnotes)
	compiler = compiler.use(squeeze)

	for (const remarkPlugin of config.remarkPlugins) {
		compiler = Array.isArray(remarkPlugin) ? compiler.use(...remarkPlugin) : compiler.use(remarkPlugin)
	}

	compiler = compiler.use(mdxAstToMdxHast)

	return compiler
}

function createCompiler(config) {
	let compiler = createMdxAstCompiler(config)

	for (const rehypePlugin of config.rehypePlugins) {
		compiler = Array.isArray(rehypePlugin) ? compiler.use(...rehypePlugin) : compiler.use(rehypePlugin)
	}

	compiler = compiler.use(minifyWhitespace, { newlines: true })
	compiler = compiler.use(mdxHastToJsx, config)

	return compiler
}

async function compileMdx(config) {
	let declarations = ''

	for (const name in config.data) {
		declarations += `export const ${name} = ${JSON.stringify(config.data[name])};\n`
	}

	contents = declarations + config.content

	const result = await createCompiler(config).process({ contents })

	return String(result)
}

exports.compileMdx = compileMdx
