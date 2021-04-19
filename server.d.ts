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

export interface MDXData {
	[key: string]: any
}

export function createMDXContentFromFile(content: string, opts: MDXOptions): MDXData

export function createMDXContentFromString(content: string, opts: MDXOptions): MDXData

export var createMDXContent = createMDXContentFromFile
