import { CreateReferenceTaskDto, ScheduledTaskDto } from "./taskDtos";

export const defaultScheduledTaskDto: ScheduledTaskDto = {
  name: "",
  completedDate: "",
  dueDate: "",
  id: 0,
  referenceTaskId: 0,
  completedInMinutes: 0
}

export const defaultCreateReferenceTaskDto: CreateReferenceTaskDto = {
  name: "",
  description: "",
  startDate: null,
  recurDays: ""
}