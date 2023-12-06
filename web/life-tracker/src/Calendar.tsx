import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useMemo, useState } from "react";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { Card, Checkbox, Grid, Modal, Paper, Stack, Text, TextInput } from "@mantine/core";
import { EventApi } from "@fullcalendar/core/index.js";
import { useQuery } from "react-query";
import { client } from "./client";
import { OriginTask } from "./originTask";
import { useDisclosure } from "@mantine/hooks";

export const Calendar = () => {
  const [events, setEvents] = useState<EventApi[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const query = useQuery("tasks", async () => {
    const data = await client.get<OriginTask[]>("/tasks");
    return data.data.map((task: OriginTask) => {
      return {
        ...task,
        startDate: new Date(Date.parse(task.startDate.toString()))
      }

    })
  });
  const [selectedEvent, setSelectedEvent] = useState<OriginTask>();


  if (query.isLoading) {
    return <></>;
  }

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

  const handleEventClick = (selected: any) => {
    console.log(query?.data?.find((val) => val.id.toString() === selected.event.id)?.startDate)
    setSelectedEvent(query?.data?.find((val) => val.id.toString() === selected.event.id))
    open();
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    //   //delete event
    // }
  };

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
              {events.map((event) => (
                <Card key={event.id}>
                  <Text>{event.title}</Text>
                  <Text>{event.start?.toDateString()}</Text>
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
              select={handleDateClick}
              eventClick={handleEventClick}
              eventsSet={(events) => setEvents(events)}
              initialEvents={query.data?.map((event: OriginTask) => {
                return {
                  id: event.id.toString(),
                  title: event.taskName,
                  date: event.startDate,
                  allDay: true,
                };
              })}
            />
          </Paper>
        </Grid.Col>
      </Grid>
      <Modal
        opened={opened}
        onClose={close}
        title="Add event"
      >
        <TextInput value={selectedEvent?.taskName} label="title"/> 
        <TextInput value={selectedEvent?.taskDescription} label="title"/> 
        <DateInput value={selectedEvent?.startDate} label="start"/>
        <Checkbox checked={selectedEvent?.isComplete ?? false} label="complete"/> 

      </Modal>
    </>
  );
};
