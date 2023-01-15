import { db } from '$lib/database/database'
import { sha256 } from '$lib/hash'
import { redirect, type Actions } from '@sveltejs/kit'
import { Auth } from '$lib/auth'

// /** @type {import('./$types').PageServerLoad} */
// export async function load() {
// 	console.log('初期表示')
// 	return { success: true, message: '' }
// }

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData()
		const user_name = data.get('username') as string
		const password = data.get('password') as string

		const encrypted_password = await sha256(password)

		console.log(`User:${user_name} Password:${password}`)

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
		console.log('ログイン成功')
		// return { success: true, message: '' }
		throw redirect(302, '/dashboard')

	}

}
