import { CalendarEvent } from "../models/calendarEvent";
import { EventTaskDto, ScheduledTaskDto } from "../models/dtos/taskDtos";

export const convertEventToCalendarEvent = (event: EventTaskDto) => {
  const completed = isDateInPast(event.endDate);
  return {
    id: event.id.toString(),
    title: event.title,
    allDay: event.allDay,
    color: completed ? "rgba(228, 108, 57, 0.5)" : "#E46C39",
    start: new Date(event.startDate),
    end: new Date(event.endDate),
  } as CalendarEvent;
};

export const convertScheduledTaskToCalendarEvent = (
  scheduledTask: ScheduledTaskDto
) => {
  const completed = isTaskCompleted(scheduledTask.completedDate);
  return {
    id: scheduledTask.id.toString(),
    title: scheduledTask.name,
    date: new Date(scheduledTask?.dueDate),
    allDay: true,
    color: completed ? "rgba(98, 190, 193, 0.5)" : "#62bec1",
  } as CalendarEvent;
};

const isDateInPast = (date: string) => {
  const compareDate = new Date(date)
  return compareDate < new Date()
}

const isTaskCompleted = (date: string) => {
  const compareDate = new Date(date)
  const defaultDate = Date.parse('0001-01-01T00:00:00.0000000')
  return compareDate.getTime() !== defaultDate
}