'use client'

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	ArrowUpDown,
	ChevronDown,
	LoaderCircle,
	MoreHorizontal,
	Plus,
} from 'lucide-react'

import { queryClient } from '@/app/providers'
import { MarkdownHelpDialog } from '@/components/MarkDownHelpDIalog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { paymentRepository } from '@/lib/backend/repository/paymentRepository'
import { tableHelpContent } from '@/lib/frontend/markdown/tableHelp'
import { paymentSchema } from '@/lib/share/schemas'
import { queryKeys } from '@/lib/utils/queryKeys'
import { getInputProps, getSelectProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import type { payment as Payment } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function TablePage() {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
	const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)

	const { data: payments, isLoading } = useQuery({
		queryKey: queryKeys.payment.all,
		queryFn: async () => {
			return (await paymentRepository.getAllPayment()) || []
		},
	})

	const createMutation = useMutation({
		mutationFn: paymentRepository.createPayment,
		onSuccess: () => {
			setIsAddDialogOpen(false)
			queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
		},
	})

	const updateMutation = useMutation({
		mutationFn: paymentRepository.updatePayment,
		onSuccess: () => {
			setIsEditDialogOpen(false)
			setCurrentPayment(null)
			queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
		},
	})

	const deleteMutation = useMutation({
		mutationFn: paymentRepository.deletePayment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
		},
	})

	const handleAdd = (newPayment: Omit<Payment, 'id'>) => {
		createMutation.mutate(newPayment)
		queryClient.invalidateQueries({ queryKey: queryKeys.payment.all })
	}

	const handleEdit = (payment: Payment) => {
		setCurrentPayment(payment)
		setIsEditDialogOpen(true)
	}

	const handleUpdate = (updatedPayment: Payment) => {
		updateMutation.mutate(updatedPayment)
	}

	const handleDelete = (id: number) => {
		deleteMutation.mutate(id)
	}

	const columns: ColumnDef<Payment>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && 'indeterminate')
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue('status')}</div>
			),
		},
		{
			accessorKey: 'email',
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					>
						Email
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				)
			},
			cell: ({ row }) => (
				<div className="lowercase">{row.getValue('email')}</div>
			),
		},
		{
			accessorKey: 'amount',
			header: () => <div className="text-right">Amount</div>,
			cell: ({ row }) => {
				const amount = Number.parseFloat(row.getValue('amount'))

				// Format the amount as a dollar amount
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD',
				}).format(amount)

				return <div className="text-right font-medium">{formatted}</div>
			},
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const payment = row.original

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(payment.id.toString())
								}
							>
								Copy payment ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => {
									handleEdit(payment)
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => handleDelete(payment.id)}>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]

	const table = useReactTable({
		data: payments || [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	return (
		<div className="flex flex-col gap-8 p-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center justify-between">
					<h2 className="font-bold text-2xl tracking-tight">テーブル</h2>
					<MarkdownHelpDialog
						title="Next.jsでのデータテーブル実装について"
						content={tableHelpContent}
						ariaLabel="データテーブルについてのヘルプ"
					/>
				</div>
				<div className="flex items-center justify-between">
					<Input
						placeholder="Filter emails..."
						value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
						onChange={(event) =>
							table.getColumn('email')?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<div className="flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="ml-auto">
									Columns <ChevronDown className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => {
										return (
											<DropdownMenuCheckboxItem
												key={column.id}
												className="capitalize"
												checked={column.getIsVisible()}
												onCheckedChange={(value) =>
													column.toggleVisibility(!!value)
												}
											>
												{column.id}
											</DropdownMenuCheckboxItem>
										)
									})}
							</DropdownMenuContent>
						</DropdownMenu>
						<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
							<DialogTrigger asChild>
								<Button
									className="ml-auto"
									onClick={() => setIsAddDialogOpen(true)}
								>
									<Plus className="mr-2 h-4 w-4" /> Add Payment
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add Payment</DialogTitle>
									<DialogDescription>
										Add a new payment to the table.
									</DialogDescription>
								</DialogHeader>
								<AddEditPaymentForm onSubmit={handleAdd} />
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell colSpan={columns.length} className="h-24">
										<div className="flex items-center justify-center">
											<LoaderCircle className="h-6 w-6 animate-spin" />
										</div>
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex items-center justify-end space-x-2">
					<div className="flex-1 text-muted-foreground text-sm">
						{table.getFilteredSelectedRowModel().rows.length} of{' '}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
			<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Payment</DialogTitle>
						<DialogDescription>Edit the payment details.</DialogDescription>
					</DialogHeader>
					{currentPayment && (
						<AddEditPaymentForm
							onSubmit={handleUpdate}
							initialData={currentPayment}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

interface AddEditPaymentFormProps {
	onSubmit: (payment: Payment) => void
	initialData?: Payment
}

function AddEditPaymentForm({
	onSubmit,
	initialData,
}: AddEditPaymentFormProps) {
	const [form, fields] = useForm({
		onSubmit: (event) => {
			event.preventDefault()
			const formData = new FormData(event.currentTarget)
			const payment = {
				id: initialData?.id ?? 0,
				email: formData.get('email') as string,
				amount: Number(formData.get('amount')),
				status: formData.get('status') as string,
				created_at: initialData?.created_at ?? new Date(),
				updated_at: new Date(),
			}
			onSubmit(payment as Payment)
		},
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: paymentSchema })
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<form
			id={form.id}
			onSubmit={form.onSubmit}
			className="space-y-4"
			noValidate
		>
			<div className="grid gap-4 py-4">
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor={fields.email.id} className="text-right">
						Email
					</Label>
					<div className="col-span-3">
						<Input
							{...getInputProps(fields.email, { type: 'email' })}
							defaultValue={initialData?.email ?? ''}
						/>
						{fields.email.errors && (
							<div className="text-destructive text-sm">
								{fields.email.errors}
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor={fields.amount.id} className="text-right">
						Amount
					</Label>
					<div className="col-span-3">
						<Input
							{...getInputProps(fields.amount, { type: 'number' })}
							defaultValue={initialData?.amount?.toString() ?? ''}
						/>
						{fields.amount.errors && (
							<div className="text-destructive text-sm">
								{fields.amount.errors}
							</div>
						)}
					</div>
				</div>
				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor={fields.status.id} className="text-right">
						Status
					</Label>
					<div className="col-span-3">
						<select
							{...getSelectProps(fields.status)}
							defaultValue={initialData?.status ?? 'pending'}
							className="w-full rounded-md border border-input bg-background px-3 py-2"
						>
							<option value="pending">Pending</option>
							<option value="processing">Processing</option>
							<option value="success">Success</option>
							<option value="failed">Failed</option>
						</select>
						{fields.status.errors && (
							<div className="text-destructive text-sm">
								{fields.status.errors}
							</div>
						)}
					</div>
				</div>
			</div>
			<DialogFooter>
				<Button type="submit">{initialData ? 'Update' : 'Add'} Payment</Button>
			</DialogFooter>
		</form>
	)
}
