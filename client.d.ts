import * as React from 'react'

export interface MDXComponents {
	[componentName: string]: React.ReactNode
}

export interface MDXContentProps {
	[key: string]: any
}

export function useMDXContent(serverData: MDXContentProps, components: MDXComponents): React.ReactNode
