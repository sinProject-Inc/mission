import { db } from '$lib/database/database'
import { sha256 } from '$lib/hash'
import { redirect, type Actions } from '@sveltejs/kit'
import { Auth } from '$lib/auth'

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()
		const user_name = data.get('username') as string
		const password = data.get('password') as string
		const encrypted_password = await sha256(password)

		const user = await db.user.findFirst({
			where: {
				name: user_name,
				password: encrypted_password,
				isEnabled: true,
			},
		})

		if (!user) {
			return { success: false, message: 'ユーザーが存在しないかパスワードが間違っています。' }
		}

		await Auth.login(user_name, cookies)

		throw redirect(302, '/dashboard')
	},
}
