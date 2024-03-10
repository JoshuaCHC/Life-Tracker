import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useMemo, useState } from 'react';
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from '@fullcalendar/core';
import dayjs from 'dayjs';
import { Box, Paper, useTheme } from '@mui/material';
import { useGetScheduledTasksQuery } from '../../hooks/data/scheduledTasksService';
import { useGetEventTasks } from '../../hooks/data/eventTasksService';
import {
  convertEventToCalendarEvent,
  convertScheduledTaskToCalendarEvent,
} from '../../utils/calendarEventMapper';
import { EventDateFields, ScheduledTaskDto } from '../../models/dtos/taskDtos';
import { defaultScheduledTaskDto } from '../../models/dtos/emptyDtos';

import { useDialogControl } from '../../hooks/dialogControl';
import { CompleteTaskDialog } from '../../components/completeTaskDialog/CompleteTaskDialog';
import { CreateEventDialog } from '../../components/createEventDialog/CreateEventDialog';

export const Calendar = () => {
  const {
    open: createEventDialogOpen,
    handleChange: setCreateEventDialogOpen,
  } = useDialogControl();
  const {
    open: completeTaskDialogOpen,
    handleChange: setCompleteTaskDialogOpen,
  } = useDialogControl();

  const theme = useTheme();
  const [selectedTask, setSelectedTask] = useState<ScheduledTaskDto>(
    defaultScheduledTaskDto
  );
  const [eventDateFields, setEventDateFields] = useState<EventDateFields>();

  const scheduledTasks = useGetScheduledTasksQuery();
  const events = useGetEventTasks();

  const calendarEvents = useMemo(() => {
    const eventTasks = events.data?.map((event) =>
      convertEventToCalendarEvent(event)
    );
    const scheduledEvents = scheduledTasks.data?.map((scheduledTask) =>
      convertScheduledTaskToCalendarEvent(scheduledTask)
    );
    return eventTasks?.concat(scheduledEvents ?? []);
  }, [scheduledTasks.data, events.data]);

  const handleDateClick = (selected: DateSelectArg) => {
    setEventDateFields({
      startDate: dayjs(selected.start),
      endDate: dayjs(selected.end),

      allDay: selected.allDay,
    } as EventDateFields);

    setCreateEventDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    const selectTask = scheduledTasks.data?.find(
      (val) => val.id.toString() === selected.event.id
    );
    if (!selectTask) return;
    setSelectedTask(selectTask);
    setCompleteTaskDialogOpen(true);
  };

  const renderEventContent = (eventInfo: EventContentArg) => (
    <Box
      sx={{
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingLeft: '4px',
        paddingRight: '8px',
      }}
    >
      {eventInfo.event.title}
    </Box>
  );

  return (
    <Box>
      <Paper
        elevation={2}
        sx={{
          background: theme.palette.background.paper,
          borderRadius: '4px',
          p: '16px',
        }}
      >
        <FullCalendar
          height="75vh"
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          initialView="dayGridMonth"
          editable
          selectable
          selectMirror
          dayMaxEvents
          eventContent={renderEventContent}
          select={handleDateClick}
          eventClick={handleEventClick}
          events={calendarEvents}
        />
      </Paper>
      <CompleteTaskDialog
        opened={completeTaskDialogOpen}
        close={() => setCompleteTaskDialogOpen(false)}
        selectedEvent={selectedTask}
      />
      <CreateEventDialog
        opened={createEventDialogOpen}
        close={() => setCreateEventDialogOpen(false)}
        newEvent={eventDateFields}
      />
    </Box>
  );
};
