'use client'

import * as ToastPrimitives from '@radix-ui/react-toast'
import { type VariantProps, cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import type * as React from 'react'

import { useToastStore } from '@/lib/store'
import { cn } from '@/lib/utils'

// トーストのスタイル定義
const toastVariants = cva(
	'group data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[state=closed]:animate-out data-[state=open]:animate-in data-[swipe=end]:animate-out',
	{
		variants: {
			variant: {
				default: 'border bg-background text-foreground',
				destructive:
					'destructive group border-destructive bg-destructive text-destructive-foreground',
				primary: 'border-primary bg-primary text-primary-foreground',
				secondary: 'border-secondary bg-secondary text-secondary-foreground',
				accent: 'border-accent bg-accent text-accent-foreground',
				muted: 'border-muted bg-muted text-muted-foreground',
				success: 'border-success bg-success text-success-foreground',
				warning: 'border-warning bg-warning text-warning-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

// トーストコンポーネント
export function Toast({
	id,
	type = 'default',
	title,
	description,
	action,
	open,
}: {
	id: string
	type?: VariantProps<typeof toastVariants>['variant']
	title: string
	description?: string
	action?: React.ReactNode
	open: boolean
}) {
	const { setToastOpen } = useToastStore()

	return (
		<ToastPrimitives.Root
			open={open}
			onOpenChange={(open) => setToastOpen(id, open)}
			className={cn(toastVariants({ variant: type }))}
		>
			<div className="grid gap-1">
				{title && (
					<ToastPrimitives.Title className="font-semibold text-sm">
						{title}
					</ToastPrimitives.Title>
				)}
				{description && (
					<ToastPrimitives.Description className="text-sm opacity-90">
						{description}
					</ToastPrimitives.Description>
				)}
			</div>
			{action}
			<ToastPrimitives.Close className="absolute top-1 right-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100">
				<X className="h-4 w-4" />
			</ToastPrimitives.Close>
		</ToastPrimitives.Root>
	)
}

// トーストアクションコンポーネント
export function ToastAction({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>) {
	return (
		<ToastPrimitives.Action
			className={cn(
				'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 font-medium text-sm transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:focus:ring-destructive group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground',
				className,
			)}
			{...props}
		/>
	)
}

// トーストコンテナコンポーネント
export function ToastContainer() {
	const { toasts } = useToastStore()

	return (
		<ToastPrimitives.Provider>
			{toasts.map(({ id, type, title, description, action, open }) => (
				<Toast
					key={id}
					id={id}
					type={type}
					title={title}
					description={description}
					action={action}
					open={open}
				/>
			))}
			<ToastPrimitives.Viewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]" />
		</ToastPrimitives.Provider>
	)
}
