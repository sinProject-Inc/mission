export const format_yyyy_mm_dd = (date: Date | undefined): string => {

    if(date === undefined) return ''

	const fullYear = date?.getFullYear()
	const month = date?.getMonth()
	const realMonth = month !== undefined ? month + 1 : undefined
	const formattedMonth = `${realMonth}`.length == 1 ? '0' + realMonth : realMonth
	const day = date?.getDate()
	const formattedDate = `${day}`.length == 1 ? '0' + day : day

	return `${fullYear}-${formattedMonth}-${formattedDate}`
}
