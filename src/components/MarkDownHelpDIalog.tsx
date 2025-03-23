'use client'

import { MarkdownDialog } from '@/components/MarkdownDialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { HelpCircle } from 'lucide-react'

interface MarkdownHelpDialogProps {
	title: string
	content: string
	ariaLabel?: string
}

export function MarkdownHelpDialog({
	title,
	content,
	ariaLabel = 'ヘルプ',
}: MarkdownHelpDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-8 w-8"
					aria-label={ariaLabel}
				>
					<HelpCircle className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<MarkdownDialog title={title} content={content} />
		</Dialog>
	)
}
