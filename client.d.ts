import * as React from 'react'

export interface MDXComponents {
	[componentName: string]: React.ReactNode
}

export interface MDXContentProps {
	data: {
		[key: string]: any
	},
	content: string,
	rawData: string,
	arguments: [string, string, string, string]
}

export interface MDXContentPropsWithFile extends MDXContentProps {
	path: string
}

export function useMDXContent(serverData: MDXContentProps, components: MDXComponents): React.ReactNode
