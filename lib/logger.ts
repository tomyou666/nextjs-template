import pino from 'pino'

const logLevel = process.env.NODE_ENV === 'production' ? 'debug' : 'trace'
const frontendOrigin = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN
const logUrl = `${frontendOrigin}/api/log`

// pino-prettyの設定です。
const DEFAULT_PRETTY_OPTIONS = {
	colorize: true,
	translateTime: 'yyyy-mm-dd hh:MM:ss',
	// ログを同期的に出力
	sync: true,
	// オブジェクトを隠さずに表示
	hideObject: false,
} as const

export const logger = pino(
	{
		level: logLevel,
		timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
		transport: {
			targets: [
				{
					level: logLevel,
					target: 'pino-pretty',
					options: DEFAULT_PRETTY_OPTIONS,
				},
				{
					level: logLevel,
					target: 'pino-roll',
					options: {
						file: 'logs/log',
						mkdir: true,
						size: '10m',
						limit: {
							count: 10,
						},
						dateFormat: 'yyyy-MM-dd',
					},
				},
			],
		},
		browser: {
			// see https://github.com/pinojs/pino/issues/1795
			// write: () => {}, // ブラウザのコンソールにログを出力しないようにする
			// ブラウザやミドルウェアのログをサーバーに送信するための設定
			transmit: {
				send: (level, logEvent) => {
					// childを使用する場合にはlogEvent.messagesだけでなく、bindingsもサーバーに送信する必要がある
					const messages = logEvent.messages
					// ミドルウェアではnavigator.sendBeaconは使用できないため、keepalive:true の fetch を使用
					// /api/logにリクエスト
					void fetch(logUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ level, messages }),
						keepalive: true,
					})
				},
			},
		},
	},
	// prettyStream,
)
