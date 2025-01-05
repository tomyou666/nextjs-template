export type LogLevel =
	| 'info'
	| 'warning'
	| 'error'
	| 'debug'
	| 'trace'
	| 'fatal'
	| 'silent'

export interface Log {
	level: LogLevel
	messages: string[]
}
