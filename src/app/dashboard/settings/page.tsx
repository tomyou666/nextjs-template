'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'

const settingsFormSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	marketingEmails: z.boolean().default(false).optional(),
	securityEmails: z.boolean(),
})

type SettingsFormValues = z.infer<typeof settingsFormSchema>

const defaultValues: Partial<SettingsFormValues> = {
	name: 'John Doe',
	email: 'john@example.com',
	marketingEmails: false,
	securityEmails: true,
}

export default function SettingsPage() {
	const form = useForm<SettingsFormValues>({
		resolver: zodResolver(settingsFormSchema),
		defaultValues,
	})

	const { toast } = useToast()

	function onSubmit(data: SettingsFormValues) {
		toast({
			title: 'You submitted the following values:',
			description: JSON.stringify(data, null, 2),
			type: 'warning',
			duration: 3000,
		})
	}

	return (
		<div className="space-y-6">
			<div>
				<h3 className="font-medium text-lg">Settings</h3>
				<p className="text-muted-foreground text-sm">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<div className="divide-y divide-gray-200">
				<div className="space-y-6 py-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Your name" {...field} />
										</FormControl>
										<FormDescription>
											This is the name that will be displayed on your profile
											and in emails.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="Your email" {...field} />
										</FormControl>
										<FormDescription>
											This is the email that will be used for account-related
											notifications.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="marketingEmails"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
										<div className="space-y-0.5">
											<FormLabel>Marketing emails</FormLabel>
											<FormDescription>
												Receive emails about new products, features, and more.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="securityEmails"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
										<div className="space-y-0.5">
											<FormLabel>Security emails</FormLabel>
											<FormDescription>
												Receive emails about your account security.
											</FormDescription>
										</div>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
												disabled
												aria-readonly
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button type="submit">Update settings</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
