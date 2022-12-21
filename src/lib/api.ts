export class Api {
	public constructor(private readonly _origin = '') {}

	private async _fetch<T>(path: string): Promise<T> {
		const response = await fetch(`${this._origin}${path}`)
		const result = (await response.json()) as T

		return result
	}

	public async username_exists(user_name: string): Promise<boolean> {
		const user = await this._fetch<Text[]>(`/api/username_exists/${user_name}`)
		return new Promise((resolve) => {
			if (user !== null && user.name === user_name) {
				resolve(true)
			} else {
				resolve(false)
			}
		})
	}
}
