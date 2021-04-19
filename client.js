/** @type {import('./client').useMDXContent} */
function useMDXContent(mdx, components) {
	const { createElement, Fragment } = require('react');

	return Reflect.construct(Function, mdx['#'])(components, createElement, Fragment)
}

exports.useMDXContent = useMDXContent
