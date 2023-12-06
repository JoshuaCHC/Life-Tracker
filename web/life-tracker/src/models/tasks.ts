export type ScheduledTask = {
  name: string,
  completedDate: Date,
  dueDate: Date,
  id: number,
  referenceTaskId: number
}

export type ReferenceTask = {
  id: number,
  name: string,
  description: string,
  startDate: Date,
  recurDays: number
}