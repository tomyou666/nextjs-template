import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * ボタンのバリエーション定義
 *
 * 使用例:
 * ```tsx
 * // デフォルトボタン（青/プライマリー）
 * <Button>デフォルトボタン</Button>
 *
 * // 破壊的アクション用ボタン（赤）
 * <Button variant="destructive">削除</Button>
 *
 * // アウトラインボタン
 * <Button variant="outline">アウトライン</Button>
 *
 * // セカンダリーボタン（グレー）
 * <Button variant="secondary">セカンダリー</Button>
 *
 * // ゴーストボタン（背景なし、ホバー時のみ背景色）
 * <Button variant="ghost">ゴースト</Button>
 *
 * // リンクボタン（下線付きテキスト）
 * <Button variant="link">リンク</Button>
 *
 * // 成功アクション用ボタン（緑）
 * <Button variant="success">成功</Button>
 *
 * // 警告アクション用ボタン（黄/オレンジ）
 * <Button variant="warning">警告</Button>
 *
 * // サイズバリエーション
 * <Button size="sm">小</Button>
 * <Button size="default">中（デフォルト）</Button>
 * <Button size="lg">大</Button>
 * <Button size="icon">アイコン</Button>
 * ```
 */
const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				success:
					'bg-success text-success-foreground shadow-sm hover:bg-success/90',
				warning:
					'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
