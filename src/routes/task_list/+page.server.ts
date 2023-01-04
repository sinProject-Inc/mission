import { db } from '$lib/database/database'
import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const tasks = await db.task.findMany({
		orderBy: {
			id: 'asc',
		},
	})

	return { tasks }
}
