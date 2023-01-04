import { PrismaClient } from '@prisma/client'
export const db = new PrismaClient()


export class Database {
	public static async getAppSettingInt(key: string): Promise<number> {
		const appSetting = await db.appSetting.findUnique({ where: { key } })
		const number_value = Number(appSetting?.value)
		const number_value_not_nan = Number.isNaN(number_value) ? 0 : number_value

		return number_value_not_nan
	}

	public static async getAppSettingString(key: string): Promise<string> {
		const appSetting = await db.appSetting.findUnique({ where: { key } })

		const string_value = appSetting?.value.toString() ?? ''

		return string_value
	}
}
