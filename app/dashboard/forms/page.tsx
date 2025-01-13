'use client'

import { CheckboxSample } from '@/components/CheckboxSample'
import { DatePickerSample } from '@/components/DatePickerSample'
import { EmailInputSample } from '@/components/EmailInputSample'
import { PasswordInputSample } from '@/components/PasswordInputSample'
import { RadioGroupSample } from '@/components/RadioGroupSample'
import { SelectSample } from '@/components/SelectSample'
import { TextInputSample } from '@/components/TextInputSample'
import { TextareaSample } from '@/components/TextareaSample'
import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

export default function FormsPage() {
	const { toast } = useToast()

	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="font-bold text-3xl tracking-tight">Forms</h2>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
				{/* gridで縦に並べる */}
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
				<TextInputSample />
				<EmailInputSample />
				<PasswordInputSample />
				<TextareaSample />
				<SelectSample />
				<CheckboxSample />
				<RadioGroupSample />
				<DatePickerSample />
			</div>
		</div>
	)
}
