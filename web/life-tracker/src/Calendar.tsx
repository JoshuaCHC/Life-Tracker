import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { DateInput } from "@mantine/dates";
import { Button, Card, Checkbox, Flex, Grid, Group, Modal, Paper, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ScheduledTask } from "./models/tasks";
import { IconCheck } from "@tabler/icons-react";
import { useCompleteScheduledTaskMutation, useGetScheduledTasksQuery } from "./hooks/scheduledTasksService";
import { useGetReferenceTasks } from "./hooks/referenceTasksService";
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";

export const Calendar = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedEvent, setSelectedEvent] = useState<ScheduledTask>();

  const scheduledTasks = useGetScheduledTasksQuery();
  const completeTask = useCompleteScheduledTaskMutation();

  const events = useMemo(() => {
    return scheduledTasks.data?.map(scheduledTask => {
      const completed = new Date(scheduledTask.completedDate).getTime() > 0
      console.log(completed, new Date(scheduledTask.completedDate).getTime(),new Date(0).getTime(), scheduledTask.completedDate )
      return {
        id: scheduledTask.id.toString(),
        title: scheduledTask.name,
        date: new Date(scheduledTask.dueDate),
        allDay: true,
        color: completed ? "#404e4d" : "#62bec1",
      }
    })
  }, [scheduledTasks.data])

  //TODO Add events in backend, and add the ability to add them in here
  // const handleDateClick = (selected: any) => {
  //   const title = prompt("Please enter a new title for your event"); // replace with modal?
  //   const calendarApi = selected.view.calendar;
  //   calendarApi.unselect();

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: `${selected.dateStr}-${title}`,
  //       title,
  //       start: selected.startStr,
  //       end: selected.endStr,
  //       allDay: selected.allDay,
  //     });
  //     //send request to add to db
  //   }
  // };

  const handleEventClick = (selected: EventClickArg) => {
    //console.log(query?.data?.find((val) => val.id.toString() === selected.event.id)?.startDate)

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
        {isEventCompleted(eventInfo.event.id) ? <ThemeIcon variant="outline" radius="md" size="xs" color="green"><IconCheck
              style={{ width: '70%', height: '70%' }}
            /></ThemeIcon> : <></>}
      </Flex>
    )
  }

  return (
    <>
      <Grid
        gutter={{ base: "16px" }}
        h="100%"
      >
        {/* CALENDAR SIDEBAR */}
        <Grid.Col
          p="15px"
          span={3}
        >
          <Paper
            shadow="md"
            radius="lg"
            p="xl"
            bg="#F8FAFC"
          >
            <Text
              variant="h5"
              pb="16px"
            >
              Events
            </Text>
            <Stack gap={"16px"}>
              {events?.map((event) => (
                <Card key={event.id}>
                  <Text>{event.title}</Text>
                  <Text>{new Date(event.date).toDateString()}</Text>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* CALENDAR */}
        <Grid.Col
          p="15px"
          span={9}
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
              //select={handleDateClick}
              eventClick={handleEventClick}
              events={events}
              //eventsSet={(events) => setEvents(events)}
            />
          </Paper>
        </Grid.Col>
      </Grid>
      <Modal
        opened={opened}
        onClose={close}
        title="Complete Event"
      >
        <TextInput value={selectedEvent?.name} label="Title"/> 
        <DateInput value={new Date(selectedEvent?.dueDate!)} label="Due Date" disabled/>
        <Button onClick={() => {
          completeTask.mutate({
            id: selectedEvent?.id!,
            completedDate: new Date(),
            completedInMinutes: 0, //TODO ADD SOMETHING TO HANDLE THIS
            referenceTaskId: selectedEvent?.referenceTaskId!
          })
          close()
        }}> Complete Task </Button>
      </Modal>
    </>
  );
};

