import {
  Modal,
  TextInput,
  Button,
  Stack,
  Group,
  Checkbox,
  NumberInput,
} from "@mantine/core";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { EventTask, ScheduledTask } from "./models/tasks";
import { useCompleteScheduledTaskMutation } from "./hooks/scheduledTasksService";
import { useState } from "react";
import { useAddEventTask } from "./hooks/eventTasksService";

type CreateEventModalProps = {
  opened: boolean;
  close: () => void;
  newEvent: EventTask | undefined;
};

export const CreateEventModal = ({
  opened,
  close,
  newEvent,
}: CreateEventModalProps) => {
  const createEvent = useAddEventTask();
  const [eventToCreate, setEventToCreate] = useState<EventTask | undefined>(
    newEvent
  );
  //USEFORM
  //TODO integrate with google maps
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Create Event"
    >
      <Stack gap={"8px"}>
        <TextInput
          value={eventToCreate?.title}
          onChange={(e) =>
            setEventToCreate((oldEvent) => {
              return { ...oldEvent, title: e.target.value } as EventTask;
            })
          }
          label={"Title"}
        />
        <TextInput
          value={eventToCreate?.title}
          onChange={(e) =>
            setEventToCreate((oldEvent) => {
              return { ...oldEvent, location: e.target.value } as EventTask;
            })
          }
          label={"Location"}
        />

        <Group gap={"2px"}>
          <DateTimePicker
            value={eventToCreate?.startDate}
            onChange={(e) =>
              setEventToCreate((oldEvent) => {
                return { ...oldEvent, startDate: e } as EventTask;
              })
            }
            label="Start Date"
            disabled={eventToCreate?.allDay}
            style={{ width: "40%" }}
          />
          <DateTimePicker
            value={eventToCreate?.endDate}
            onChange={(e) =>
              setEventToCreate((oldEvent) => {
                return { ...oldEvent, endDate: e } as EventTask;
              })
            }
            label="End Date"
            disabled={eventToCreate?.allDay}
            style={{ width: "40%" }}
          />
          <Checkbox
            checked={eventToCreate?.allDay}
            onChange={(e) =>
              setEventToCreate((oldEvent) => {
                return {
                  ...oldEvent,
                  allDay: e.currentTarget?.checked ?? false,
                } as EventTask;
              })
            }
            label="All Day"
            style={{ width: "15%" }}
          />
        </Group>
        <NumberInput
          label="Expected Cost"
          placeholder="Dollars"
          prefix="$"
          value={eventToCreate?.expectedCost}
          onChange={(e) =>
            setEventToCreate((oldEvent) => {
              return {
                ...oldEvent,
                expectedCost: new Number(e) ?? 0,
              } as EventTask;
            })
          }
        />
      </Stack>
    </Modal>
  );
};
