import { Pluggable, Compiler } from 'unified'
import * as React from 'react'

export interface MDXComponents {
	[componentName: string]: React.ReactNode
}

export interface MDXOptions {
	components?: MDXComponents
	path?: string
	hastPlugins?: Pluggable[]
	rehypePlugins?: Pluggable[]
	remarkPlugins?: Pluggable[]
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

export function createMDXContentFromFile(content: string, opts: MDXOptions): MDXContentProps

export function createMDXContentFromString(content: string, opts: MDXOptions): MDXContentPropsWithFile

export var createMDXContent = createMDXContentFromFile
