import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { Flex, Grid, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ScheduledTask, EventTask } from "./models/tasks";
import { useGetScheduledTasksQuery } from "./hooks/scheduledTasksService";
import { DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { CompleteTaskModal } from "./CompleteTaskModal";
import { CreateEventModal } from "./components/createEventModal/CreateEventModal";
import dayjs from "dayjs";

export const Calendar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<ScheduledTask>();
  const [newEvent, setNewEvent] = useState<EventTask>();

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

  const handleDateClick = (selected: DateSelectArg) => {
    setNewEvent({
      startDate: dayjs(selected.start),
      endDate: dayjs(selected.end),
      allDay: selected.allDay
    } as EventTask)
    
    setCreateEventModalOpen(true)
  };

  const handleEventClick = (selected: EventClickArg) => {
    setSelectedTask(scheduledTasks.data?.find((val) => val.id.toString() === selected.event.id))
    open();
  };

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
            />
          </Paper>
        </Grid.Col>
      </Grid>
      <CompleteTaskModal opened={opened} close={close} selectedEvent={selectedTask} />
      <CreateEventModal opened={createEventModalOpen} close={() => setCreateEventModalOpen(false)} newEvent={newEvent} /> 
    </>
  );
};

