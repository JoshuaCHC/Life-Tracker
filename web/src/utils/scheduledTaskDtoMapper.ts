import dayjs from 'dayjs';
import { ScheduledTaskDto, ViewScheduledTaskDto } from '../models/dtos/taskDtos';
import { isTaskCompleted } from './dateUtils';
import { defaultScheduledTaskDto } from '../models/dtos/emptyDtos';

export const convertScheduledTaskToViewScheduledTask = (scheduledTask: ScheduledTaskDto) => {
  if (scheduledTask === defaultScheduledTaskDto) return undefined;

  const completedDate = isTaskCompleted(scheduledTask.completedDate) ? dayjs(scheduledTask.completedDate) : undefined;

  const completedIn = scheduledTask.completedInMinutes !== 0 ? scheduledTask.completedInMinutes : '';

  return {
    dueDate: dayjs(scheduledTask.dueDate),
    completedDate,
    completedInMinutes: completedIn,
    name: scheduledTask.name,
  } as ViewScheduledTaskDto;
};
