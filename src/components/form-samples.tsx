'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/util/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

export default function FormSamples() {
	const [date, setDate] = useState<Date>()

	return (
		<div className="mx-auto max-w-2xl space-y-8 p-6">
			<h1 className="mb-6 font-bold text-3xl">shadcn/ui Form Samples</h1>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Text Input</h2>
				<Input type="text" placeholder="Enter your name" />
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Email Input</h2>
				<Input type="email" placeholder="Enter your email" />
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Password Input</h2>
				<Input type="password" placeholder="Enter your password" />
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Textarea</h2>
				<Textarea placeholder="Enter your message" />
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Select</h2>
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a fruit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="orange">Orange</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Checkbox</h2>
				<div className="flex items-center space-x-2">
					<Checkbox id="terms" />
					<Label htmlFor="terms">Accept terms and conditions</Label>
				</div>
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Radio Group</h2>
				<RadioGroup defaultValue="comfortable">
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="default" id="r1" />
						<Label htmlFor="r1">Default</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="comfortable" id="r2" />
						<Label htmlFor="r2">Comfortable</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="compact" id="r3" />
						<Label htmlFor="r3">Compact</Label>
					</div>
				</RadioGroup>
			</div>

			<div className="space-y-4">
				<h2 className="font-semibold text-xl">Date Picker</h2>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-full justify-start text-left font-normal',
								!date && 'text-muted-foreground',
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{date ? format(date, 'PPP') : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>

			<Button className="w-full">Submit</Button>
		</div>
	)
}
