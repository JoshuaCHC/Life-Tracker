import { CalendarEvent } from '../models/calendarEvent';
import { EventTaskDto, ScheduledTaskDto } from '../models/dtos/taskDtos';
import { isTaskCompleted } from './dateUtils';

const isDateInPast = (date: string) => {
  const compareDate = new Date(date);
  return compareDate < new Date();
};

export const convertEventToCalendarEvent = (event: EventTaskDto) => {
  const completed = isDateInPast(event.endDate);
  return {
    id: event.id.toString(),
    title: event.title,
    allDay: event.allDay,
    color: completed ? 'rgba(228, 108, 57, 0.5)' : '#E46C39',
    start: new Date(event.startDate),
    end: new Date(event.endDate),
  } as CalendarEvent;
};

export const convertScheduledTaskToCalendarEvent = (scheduledTask: ScheduledTaskDto) => {
  const completed = isTaskCompleted(scheduledTask.completedDate);
  return {
    id: scheduledTask.id.toString(),
    title: scheduledTask.name,
    date: new Date(scheduledTask?.dueDate),
    allDay: true,
    color: completed ? 'rgba(98, 190, 193, 0.5)' : '#62bec1',
  } as CalendarEvent;
};
