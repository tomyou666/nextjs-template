import pino from 'pino'
import { LOGGER_CONSTANTS } from './constants'

const logLevel =
	process.env.NODE_ENV === 'production'
		? LOGGER_CONSTANTS.PRODUCTION_LOG_LEVEL
		: LOGGER_CONSTANTS.DEVELOPMENT_LOG_LEVEL
const frontendOrigin = process.env.NEXT_PUBLIC_API_URL
const logUrl = `${frontendOrigin}/api/log`

export const logger = pino(
	{
		level: logLevel,
		timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
		transport: {
			targets: [
				{
					level: logLevel,
					target: 'pino-pretty',
					options: LOGGER_CONSTANTS.PRETTY_OPTIONS,
				},
				{
					level: logLevel,
					target: 'pino-roll',
					options: {
						file: LOGGER_CONSTANTS.LOG_FILE_PATH,
						mkdir: true,
						size: LOGGER_CONSTANTS.LOG_FILE_SIZE,
						limit: {
							count: LOGGER_CONSTANTS.LOG_FILE_COUNT,
						},
						dateFormat: LOGGER_CONSTANTS.LOG_DATE_FORMAT,
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
