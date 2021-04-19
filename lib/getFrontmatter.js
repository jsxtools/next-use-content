const parseAsYaml = require('js-yaml/lib/loader').load;

class Frontmatter {
	get data() {
		try {
			return parseAsYaml(this.matter)
		} catch (error) {
			return null
		}
	}
}

/** Returns file contents with parsed frontmatter. */
function getFrontmatter(/** @type {string} */ content) {
	const frontMatterCharCodes = [];
	const result = { data: {}, content, rawData: '' }

	// if the file begins with a yaml separator
	if (isSeparator(content, 0)) {
		// collect all contents before the next yaml separator
		for (let i = 3; i < content.length; ++i) {
			const code = content.charCodeAt(i);

			// if the next line begins with a yaml separator
			if (isLineFeed(code) && isSeparator(content, i + 1)) {
				// the remaining contents are the markdown content
				result.content = content.slice(i + 4);

				break;
			}

			// all prior code is the data
			frontMatterCharCodes.push(code);
		}

		result.rawData = String.fromCharCode(...frontMatterCharCodes)

		try {
			result.data = parseAsYaml(result.rawData)
		} catch (error) {}
	}

	return result
}

/** Returns whether the character code is a line feed or carriage return. */
const isLineFeed = (code) => code === 0x000a || code === 0x000d;

/** Returns whether the character code is a hypen-minus. */
const isHypenMinus = (code) => code === 0x002d;

/** Returns whether the character indexes form a yaml separator. */
const isSeparator = (contents, index) => (
	isHypenMinus(contents.charCodeAt(index))
	&& isHypenMinus(contents.charCodeAt(index + 1))
	&& isHypenMinus(contents.charCodeAt(index + 2))
)

exports.getFrontmatter = getFrontmatter
