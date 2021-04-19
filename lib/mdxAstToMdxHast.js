const toHast = require('mdast-util-to-hast')
const detab = require('detab')
const u = require('unist-builder')

/** Patches the MDX2 AST to unwrap single paragraph children of elements. */
function patchMdx2Ast(tree) {
	if (Array.isArray(tree.children)) {
		for (const child of tree.children) {
			if (child.type === 'mdxJsxFlowElement') {
				if (child.children.length === 1) {
					if (child.children[0].type === 'paragraph') {
						child.children = child.children[0].children
						break
					}
				}
			}
		}
	}
}

function mdxAstToMdxHast() {
	return tree => {
		patchMdx2Ast(tree)

		return toHast(tree, {
			passThrough: [
				'mdxFlowExpression',
				'mdxJsxFlowElement',
				'mdxJsxTextElement',
				'mdxTextExpression',
				'mdxjsEsm'
			],
			handlers: {
				// Use a custom `inlineCode` element for inline code.
				inlineCode(h, node) {
					return h(node, 'inlineCode', [{ type: 'text', value: node.value }])
				},
				// Add a custom `metastring` attribute to `code` elements,
				// and support it also as a key/value attribute setter.
				code(h, node) {
					const value = node.value ? detab(node.value + '\n') : ''
					const lang = node.lang
					const props = {}

					if (lang) {
						props.className = ['language-' + lang]
					}

					props.metastring = node.meta

					// To do: this handling seems not what users expect:
					// <https://github.com/mdx-js/mdx/issues/702>.
					const meta =
						node.meta &&
						node.meta.split(' ').reduce((acc, cur) => {
							if (cur.split('=').length > 1) {
								const t = cur.split('=')
								acc[t[0]] = t[1]
								return acc
							}

							acc[cur] = true
							return acc
						}, {})

					if (meta) {
						Object.keys(meta).forEach(key => {
							const isClassKey = key === 'class' || key === 'className'
							if (props.className && isClassKey) {
								props.className.push(meta[key])
							} else {
								props[key] = meta[key]
							}
						})
					}

					return h(node.position, 'pre', [
						h(node, 'code', props, [u('text', value)])
					])
				}
			}
		})
	}
}

exports.mdxAstToMdxHast = mdxAstToMdxHast
