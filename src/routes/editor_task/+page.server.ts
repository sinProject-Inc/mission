import { db } from '$lib/database/database'
import type { Actions } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit'

export const load: Load = async ({ url }) => {
	const id = parseInt(url.searchParams.get('id') ?? '0')
	const task = await db.task.findUnique({
		where: {
			id: id,
		},
	})
	return { task }
}

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const id = data.get('id') as string
		const idIntvalue = Number(id)
		const task = data.get('task') as string
		const description = data.get('description') as string
		const price = data.get('price') as string
		const priceIntvalue = Number(price)
		await db.task.update({
			where: {
				id: idIntvalue,
			},
			data: {
				name: task,
				description: description,
				price: priceIntvalue,
				updateDate: new Date(),
			},
		})
		return { success: true, message: 'タスクを更新しました' }
	},
}
