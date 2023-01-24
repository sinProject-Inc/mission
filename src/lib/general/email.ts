import { ValidText } from '$lib/general/valid_text'
import { EmptyError, IllegalValueError } from '$lib/general/errors'

export class Email {
	private readonly _email: string

	public constructor(email: string | undefined) {
		const trimmed_email = new ValidText(email)

		if (!trimmed_email) throw new EmptyError('email is empty')

		const email_regex = new RegExp(
			/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
		)

		if (!email_regex.test(trimmed_email.text)) {
			throw new IllegalValueError('email is invalid')
		}

		this._email = trimmed_email.text
	}

	public get email(): string {
		return this._email
	}
}
