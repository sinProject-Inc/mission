import { db } from '$lib/database/database'
import { json, type RequestHandler } from '@sveltejs/kit'

/**
 *
 * @param userName {string}
 * @returns
 */
export const GET: RequestHandler = async ({ params }): Promise<Response> => {
	const user_name = params.user_name ?? ''
	const user = await db.user.findUnique({ where: { name: user_name } })
	const response = json(user)

	return response
}
