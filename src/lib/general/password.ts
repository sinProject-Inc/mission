import { ValidText } from '$lib/general/valid_text'
import { EmptyError, IllegalValueError } from '$lib/general/errors'

export class Password {
	private readonly _password: string

	public constructor(password: string | undefined) {
		const trimmed_password = new ValidText(password)

		if (!trimmed_password) throw new EmptyError('password is empty')

		const password_regex = new RegExp(
			/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/
		)

		if (!password_regex.test(trimmed_password.text)) {
			throw new IllegalValueError('password is invalid')
		}

		this._password = trimmed_password.text
	}

	public get password(): string {
		return this._password
	}
}
