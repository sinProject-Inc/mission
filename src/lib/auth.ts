import type { AuthPin, AuthToken, Role, User } from '@prisma/client'
import type { Cookies } from '@sveltejs/kit'
import { CookiesManager } from '$lib/cookies_manager'
import { Database, db } from '$lib/database/database'

export class Auth {
	public static async login(user_name: string, cookies: Cookies): Promise<void> {
		const session_lifetime_sec = await Auth.get_session_lifetime_sec()
		const auth_token = await Auth.create_auth_token(user_name, session_lifetime_sec)
		new CookiesManager(cookies).set_session_id(auth_token.token, session_lifetime_sec)
	}

	public static async logout(cookies: Cookies): Promise<void> {
		const cookiesManager = new CookiesManager(cookies)
		await db.authToken.delete({ where: { token: cookiesManager.session_id } })
		cookiesManager.delete_session_id()
	}

	public static async get_session_lifetime_sec(): Promise<number> {
		return await Database.get_app_setting_int('session_lifetime_sec')
	}

	public static async create_auth_token(
		user_name: string,
		session_lifetime_sec: number
	): Promise<AuthToken> {
		const session_limit = await Auth.get_limit(session_lifetime_sec)

		const [auth_token] = await db.$transaction([
			db.authToken.create({
				data: { user_name: user_name, token: crypto.randomUUID() },
			}),
			db.authToken.deleteMany({
				where: { updated_at: { lt: session_limit } },
			}),
		])

		return auth_token
	}

	public static get_limit(lifetime_sec: number): Date {
		const limit = new Date()

		if (lifetime_sec == 0) console.warn('lifetime_sec is 0')

		limit.setSeconds(limit.getSeconds() - lifetime_sec)

		return limit
	}
}
