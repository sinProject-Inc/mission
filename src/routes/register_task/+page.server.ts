import { db } from '$lib/database/database'
import type { Actions } from '@sveltejs/kit'

export const actions: Actions = {
	default: async ({ request, locals }) => {
		console.log('task register')
		const data = await request.formData()
		const task = data.get('task') as string
		const description = data.get('description') as string
		const price = data.get('price') as string
		const priceIntvalue = Number(price)
		await db.task.create({ data: { name: task, description: description, price: priceIntvalue } })
		return { success: true, message: 'タスクを登録しました' }
	},
}
