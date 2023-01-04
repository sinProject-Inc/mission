import { db } from '$lib/database/database'
import { json, type RequestHandler } from '@sveltejs/kit'

/**
 *
 * @param registerId {string}
 * @returns
 */
export const GET: RequestHandler = async ({ params }): Promise<Response> => {
	const register_id = params.register_id ?? ''
	let result_message = ''

	const userRegistration = await db.userRegistration.findFirst({
		where: {
			registerId: register_id,
			expirationDate: {
				gt: new Date(),
			},
		},
		orderBy: {
			id: 'desc',
		},
	})

	if (userRegistration === null) {
		result_message = 'ユーザーの登録に失敗しました。再度登録しなおしてください。'
	}

	await db.user.update({
		where: {
			name: userRegistration?.userName,
		},
		data: {
			isEnabled: true,
		},
	})

	await db.userRegistration.delete({
		where: {
			id: userRegistration?.id,
		},
	})

	result_message = 'ユーザーの登録が完了しました。'

	const response = json(result_message)

	return response
}
