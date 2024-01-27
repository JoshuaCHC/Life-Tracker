// import {
//   Modal,
//   TextInput,
//   Button,
//   Stack,
//   Group,
//   Checkbox,
//   NumberInput,
// } from "@mantine/core";
// import { DateInput, DateTimePicker } from "@mantine/dates";
import { EventTask, ScheduledTask } from "./models/tasks";
import { useCompleteScheduledTaskMutation } from "./hooks/scheduledTasksService";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useAddEventTask } from "./hooks/eventTasksService";
import {
  Stack,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Input,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputFactory } from "./InputFactory";
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

  console.log(newEvent)
  const { control, handleSubmit, reset, getValues } = useForm<EventTask>({
    values: newEvent,
  });
  //USEFORM
  //TODO integrate with google maps
  const fields = [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    { name: "location", label: "Location", type: "text" },
    {
      name: "expectedCost",
      label: "Expected Cost",
      type: "number",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date"
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date"
    }
  ];

  const onClose = () => {
    console.log(getValues());
    reset();
    close();
  };
  return (
    <Dialog
      open={opened}
      onClose={onClose}
    >
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Stack
          gap={"12px"}
          sx={{ pt: "8px" }}
        >
          {fields.map((value) => (
            <Controller
              name={value.name as keyof EventTask}
              control={control}
              render={({ field }) => (
                <InputFactory field={field}  label={value.label} type={value.type}/> ?? <> </>
              )}
            />
          ))}

        </Stack>
      </DialogContent>
    </Dialog>
  );
};

const formatDate = (date: Date) => {
  return new Date(date.toString().split("GMT")[0] + " UTC")
    .toISOString()
    .split(".")[0];
};
