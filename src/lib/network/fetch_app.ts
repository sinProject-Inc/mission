type Fetch = (url: string, init?: RequestInit) => Promise<Response>

export class FetchApp {
	public constructor(private readonly _fetch?: Fetch) {}

	private async _execute<T>(url: string, init?: RequestInit): Promise<T> {
		const fetch_func = this._fetch ?? fetch
		const response = await fetch_func(url, init)
		const json = await response.json()
		const result = json as T

		return result
	}
}
