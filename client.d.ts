import * as React from 'react'

export interface MDXComponents {
	[componentName: string]: React.ReactNode
}

export interface MDXData {
	[key: string]: any
}

export function useMDXContent(serverData: MDXData, components: MDXComponents): React.ReactNode
