export const isTaskCompleted = (date: string) => {
  const compareDate = new Date(date)
  const defaultDate = Date.parse('0001-01-01T00:00:00.0000000')
  return compareDate.getTime() !== defaultDate
}