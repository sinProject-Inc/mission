import { db } from '$lib/database/database'
import type { Actions } from '@sveltejs/kit'
import { sha256 } from '$lib/hash'
import { NodemailerManager as NodeMailerManager } from '$lib/nodemailer_manager'
import * as crypto from 'crypto'

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

		// 20桁のランダムな文字列を生成する
		const register_id = crypto.randomBytes(20).toString('hex')
		const expiration_date = new Date()
		expiration_date.setMinutes(expiration_date.getMinutes() + 30)

		const register = {
			registerId: register_id,
			expirationDate: expiration_date,
			userName: username,
		}
		await db.userRegistration.create({ data: register })

		// 本登録用のメールを送信する
		await send_register_mail(email, register_id, request.headers.get('origin') + '/sign_up_complete'??'')

		return {
			success: true,
			message: 'ユーザー仮登録を行いました。<br>メールを確認して本登録を完了させてください。',
		}
	},
}

async function send_register_mail(email: string, register_id: string, url: string) {
	const nodeMailerManager = new NodeMailerManager()
	const userRegistrationUrl = create_register_url(register_id, url)

	try {
		await nodeMailerManager.send_mail(
			email,
			'mission ユーザー仮登録',
			`ユーザー仮登録を行いました。以下のリンクをクリックして登録を完了させてください。\n ${userRegistrationUrl}`
		)
	} catch (error) {
		console.error(error)
	}
}

function create_register_url(register_id: string, url) {
	return `${url}/${register_id}`
}
