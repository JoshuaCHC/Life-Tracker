import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { DateInput } from "@mantine/dates";
import { Button, Flex, Grid, Modal, Paper, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ScheduledTask } from "./models/tasks";
import { useCompleteScheduledTaskMutation, useGetScheduledTasksQuery } from "./hooks/scheduledTasksService";
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { CompleteEventModal } from "./CompleteEventModal";

export const Calendar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedEvent, setSelectedEvent] = useState<ScheduledTask>();

  const scheduledTasks = useGetScheduledTasksQuery();

  const calendarEvents = useMemo(() => {
    return scheduledTasks.data?.map(scheduledTask => {
      const completed = new Date(scheduledTask.completedDate).getTime() > 0
      return {
        id: scheduledTask.id.toString(),
        title: scheduledTask.name,
        date: new Date(scheduledTask.dueDate),
        allDay: true,
        color: completed ? "rgba(98, 190, 193, 0.5)" : "#62bec1",
      }
    })
  }, [scheduledTasks.data])

  //TODO Add events in backend, and add the ability to add them in here
  const handleDateClick = (selected: any) => {
    const title = prompt("Please enter a new title for your event"); // replace with modal?
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
      //send request to add to db
    }
  };

  const handleEventClick = (selected: EventClickArg) => {
    setSelectedEvent(scheduledTasks.data?.find((val) => val.id.toString() === selected.event.id))
    open();
  };

  const isEventCompleted = (id: string) => {
    return new Date(scheduledTasks.data?.find((val) => val.id.toString() === id)?.completedDate!).getTime() > 0
  }

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <Flex style={{ justifyContent: "space-between", paddingLeft: "4px", paddingRight: "8px"}} align="center">
        {eventInfo.event.title}
      </Flex>
    )
  }

  return (
    <>
      <Grid
        gutter={{ base: "16px" }}
        h="100%"
      >
        {/* CALENDAR */}
        <Grid.Col
          p="15px"
          span={12}
        >
          <Paper
            shadow="md"
            radius="lg"
            p="xl"
            bg="#F8FAFC"
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
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              eventContent={renderEventContent}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={calendarEvents}
              //eventsSet={(events) => setEvents(events)}
            />
          </Paper>
        </Grid.Col>
      </Grid>
      <CompleteEventModal opened={opened} close={close} selectedEvent={selectedEvent} />
    </>
  );
};

