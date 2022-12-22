import { db } from '$lib/database/database'
import type { Actions } from '@sveltejs/kit'
import{sha256} from '$lib/hash'

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const email = data.get('email') as string
		const password = data.get('password') as string
		const username = data.get('username') as string
		const display_name = data.get('displayname') as string
        const hashedPassword = await sha256(password)
        
		const user = {
			name: username,
			email: email,
			password: hashedPassword,
			displayName: display_name,
		}
		await db.user.create({ data: user })
		return { success: true, message: 'ユーザー登録が完了しました。' }
	},
}
