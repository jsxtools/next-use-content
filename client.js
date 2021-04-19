/** @type {import('./client').useMDXContent} */
function useMDXContent(source, components) {
	const { createElement, Fragment } = require('react');

	return Reflect.construct(Function, source.arguments)(components, createElement, Fragment)
}

exports.useMDXContent = useMDXContent
