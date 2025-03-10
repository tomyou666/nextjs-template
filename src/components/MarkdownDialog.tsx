'use client'

import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import ReactMarkdown from 'react-markdown'
import type { CodeProps } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownDialogProps {
	title: string
	content: string
}

export function MarkdownDialog({ title, content }: MarkdownDialogProps) {
	return (
		<DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
			<DialogHeader>
				<DialogTitle>{title}</DialogTitle>
			</DialogHeader>
			<div className="prose prose-sm dark:prose-invert mt-4 max-w-none">
				<ReactMarkdown
					components={{
						code(props: CodeProps) {
							const { className, children, ...rest } = props
							const match = /language-(\w+)/.exec(className || '')
							return !props.inline && match ? (
								<SyntaxHighlighter
									// @ts-ignore - Type issues with react-syntax-highlighter
									style={vscDarkPlus}
									language={match[1]}
									PreTag="div"
									{...rest}
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							) : (
								<code className={className} {...rest}>
									{children}
								</code>
							)
						},
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</DialogContent>
	)
}
