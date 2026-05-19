import { addDays, format, startOfWeek } from 'date-fns'

export function getCurrentSchoolWeek(referenceDate = new Date()) {
  const monday = startOfWeek(referenceDate, { weekStartsOn: 1 })

  return Array.from({ length: 5 }, (_, index) => addDays(monday, index))
}

export function toIsoDate(date) {
  return format(date, 'yyyy-MM-dd')
}

export function getDateForSchoolDay(ordenDia, referenceDate = new Date()) {
  const week = getCurrentSchoolWeek(referenceDate)
  return week[ordenDia - 1] ?? week[0]
}

export function createDateWithTime(date, timeValue) {
  const [hours, minutes] = timeValue.toString().slice(0, 5).split(':').map(Number)
  const result = new Date(date)

  result.setHours(hours, minutes, 0, 0)
  return result
}
