import { getScreenshotFilePath } from '@/lib/backend/utils/fileIoUtils'
import { type Page, expect, test } from '@playwright/test'

async function login(page: Page) {
	await page.getByPlaceholder('example@example.com').click()
	await page.getByPlaceholder('example@example.com').fill('test@test.com')
	await page.getByLabel('パスワード').click()
	await page.getByLabel('パスワード').fill('test@test.com')
	await expect(page.getByPlaceholder('example@example.com')).toHaveValue(
		'test@test.com',
	)
	await page.getByRole('button', { name: 'ログイン' }).click()
}

test('ログイン', async ({ page }) => {
	await page.goto('/')

	await login(page)
	await expect(page.locator('body')).toMatchAriaSnapshot(`
    - button "Toggle Sidebar":
      - img
    - separator
    - navigation "breadcrumb":
      - list:
        - listitem:
          - link "Next.JSテンプレート"
        - listitem:
          - link "ダッシュボード" [disabled]
    `)

	// fullサイズで画面をスクショ
	process.env.CI ||
		(await page.screenshot({
			path: getScreenshotFilePath(),
			fullPage: true,
		}))
})

// 認証後の処理関連
test.describe('認証後の処理関連', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
		await login(page)
	})

	test('フォーム', async ({ page }) => {
		await page.getByRole('link', { name: 'Forms' }).click()
		await page.getByPlaceholder('John Doe').click()
		await page.getByPlaceholder('John Doe').fill('John Doe')
		await page
			.locator('form')
			.filter({ hasText: 'NameSubmit' })
			.getByRole('button')
			.click()
		await expect(page.getByRole('paragraph')).toContainText(
			'フォームの送信が完了しました！',
		)
		// fullサイズで画面をスクショ
		process.env.CI ||
			(await page.screenshot({
				path: getScreenshotFilePath(),
				fullPage: true,
			}))
	})
})
