import { Dayjs } from "dayjs"

export type ScheduledTaskDto = {
  name: string,
  completedDate: string,
  dueDate: string,
  id: number,
  referenceTaskId: number,
  completedInMinutes: number
}

export type ReferenceTaskDto = {
  id: number,
  name: string,
  description: string,
  startDate: string,
  recurDays: number
}

export type CreateReferenceTaskDto = {
  name: string,
  description: string,
  startDate: string,
  recurDays: number
}

export type CompleteScheduledTaskDto = {
  id: number,
  completedDate: Dayjs | undefined,
  completedInMinutes: number,
  referenceTaskId: number
}

export type ViewScheduledTaskDto = {
  name: string,
  completedDate: Dayjs | undefined,
  dueDate: Dayjs,
  completedInMinutes: number
}

export type EventTaskDto = { 
  id: number,
  title: string,
  location: string,
  allDay: boolean,
  startDate: string,
  endDate: string,
  expectedCost: number
}

export type EventTaskCreateDto = { 
  title: string,
  location: string,
  allDay: boolean,
  startDate: Dayjs | undefined,
  endDate: Dayjs | undefined,
  expectedCost: number | undefined
}

export type EventDateFields = {
  allDay: boolean,
  startDate: Dayjs,
  endDate: Dayjs,
}