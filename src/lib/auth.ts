import type { AuthPin, AuthToken, Role, User } from '@prisma/client'
import type { Cookies } from '@sveltejs/kit'
import { CookiesManager } from '$lib/cookies_manager'
import { Database, db } from '$lib/database/database'

export class Auth {
	public static async login(user_name: string, cookies: Cookies): Promise<void> {
		const session_lifetime_sec = await Auth.getSessionLifetimeSec()
		console.log(`session_lifetime_sec:${session_lifetime_sec}`)

		const auth_token = await Auth.createAuthToken(user_name, session_lifetime_sec)
		console.log(`auth_token:${auth_token.token}`)
		console.log(`Cookies:${cookies}`)
		new CookiesManager(cookies).setSessionId(auth_token.token, session_lifetime_sec)
	}

	public static async getSessionLifetimeSec(): Promise<number> {
		return await Database.getAppSettingInt('session_lifetime_sec')
	}

	public static async createAuthToken(
		user_name: string,
		session_lifetime_sec: number
	): Promise<AuthToken> {
		const session_limit = await Auth.getLimit(session_lifetime_sec)

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

	public static getLimit(lifetime_sec: number): Date {
		const limit = new Date()

		if (lifetime_sec == 0) console.warn('lifetime_sec is 0')

		limit.setSeconds(limit.getSeconds() - lifetime_sec)

		return limit
	}
}
