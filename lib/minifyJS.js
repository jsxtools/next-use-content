const { minify } = require("terser")

async function minifyJs(/** @type {string} */ content) {
	const result = await minify(content, { ecma: 2020, keep_fnames: true });

	return result.code
}

exports.minifyJs = minifyJs
