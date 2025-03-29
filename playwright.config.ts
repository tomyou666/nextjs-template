import { defineConfig, devices } from '@playwright/test'

/**
 * 環境変数をファイルから読み込む
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * 設定の詳細はこちら: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
	testDir: './tests/e2e',
	/* テストファイルを並列実行する */
	fullyParallel: true,
	/* CIで test.only が残っていた場合にビルドを失敗させる */
	forbidOnly: !!process.env.CI,
	/* CIでのみリトライを実行 */
	retries: process.env.CI ? 2 : 0,
	/* CIでは並列テストを無効化 */
	workers: process.env.CI ? 1 : undefined,
	/* 使用するレポーター。詳細: https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* すべてのプロジェクトで共有される設定。詳細: https://playwright.dev/docs/api/class-testoptions */
	use: {
		/* アクションで使用するベースURL。例: await page.goto('/') */
		baseURL: 'http://127.0.0.1:3000',
		// ブラウザを表示するか
		// headless: false,
		/* 失敗したテストを再試行する際にトレースを収集。詳細: https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* 主要なブラウザのプロジェクト設定 */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },

		/* モバイルビューポートでのテスト */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* ブランド付きブラウザでのテスト */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* テスト開始前にローカル開発サーバーを起動 */
	// webServer: {
	//   command: 'npm run start',
	//   url: 'http://127.0.0.1:3000',
	//   reuseExistingServer: !process.env.CI,
	// },
})
