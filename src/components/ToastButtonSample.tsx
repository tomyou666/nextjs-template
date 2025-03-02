'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

export const ToastButtonSample = () => {
	const { toast } = useToast()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Toast Buttons</CardTitle>
				<CardDescription>
					Click buttons to show different types of toasts
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4">
					<Button
						variant="ghost"
						onClick={() => {
							toast({
								variant: 'default',
								title: 'Default: Catch up ',
								description: 'Friday, February 10, 2023 at 5:57 PM',
								duration: 1000,
								action: (
									<ToastAction altText="Goto schedule to undo">
										Undo
									</ToastAction>
								),
							})
						}}
					>
						Default Button
					</Button>
					<Button
						variant="default"
						onClick={() => {
							toast({
								variant: 'primary',
								title: 'Primary: Catch up ',
								description: 'Friday, February 10, 2023 at 5:57 PM',
								duration: 1000,
								action: (
									<ToastAction altText="Goto schedule to undo">
										Undo
									</ToastAction>
								),
							})
						}}
					>
						Primary Button
					</Button>
					<Button
						variant="secondary"
						onClick={() => {
							toast({
								variant: 'secondary',
								title: 'Secondary: Catch up ',
								description: 'Friday, February 10, 2023 at 5:57 PM',
								duration: 1000,
								action: (
									<ToastAction altText="Goto schedule to undo">
										Undo
									</ToastAction>
								),
							})
						}}
					>
						Secondary Button
					</Button>
					<Button
						variant="destructive"
						onClick={() => {
							toast({
								variant: 'destructive',
								title: 'Destructive: Catch up ',
								description: 'Friday, February 10, 2023 at 5:57 PM',
								duration: 1000,
								action: (
									<ToastAction altText="Goto schedule to undo">
										Undo
									</ToastAction>
								),
							})
						}}
					>
						Destructive Button
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
