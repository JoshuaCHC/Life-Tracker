import { EventTask } from "../../models/tasks";
import { useForm, Controller } from "react-hook-form";
import { useAddEventTask } from "../../hooks/eventTasksService";
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { InputFactory } from "../../InputFactory";
import { Button } from "@mantine/core";
import { dateFields, textFields } from "./CreateEventModalFields";

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

  const { control, handleSubmit, reset, watch } = useForm<EventTask>({
    values: newEvent,
  });

  const onClose = () => {
    reset();
    close();
  };

  const onSubmit = (data: EventTask) => {
    createEvent.mutate(data)
    reset()
    close()
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
          {textFields.map((value) => (
            <Controller
              name={value.name as keyof EventTask}
              control={control}
              render={({ field }) =>
                (
                  <InputFactory
                    field={field}
                    label={value.label}
                    type={value.type}
                  />
                ) ?? <> </>
              }
            />
          ))}
          <Stack
            direction={"row"}
            gap={"4px"}
          >
            {dateFields.map((value) => (
              <Controller
                name={value.name as keyof EventTask}
                control={control}
                render={({ field }) =>
                  (
                    <InputFactory
                      field={field}
                      label={value.label}
                      type={value.type}
                      disabled={
                        value.type === "date" && watch("allDay").valueOf()
                      }
                    />
                  ) ?? <> </>
                }
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSubmit(onSubmit)}>Create Event</Button>
      </DialogActions>
    </Dialog>
  );
};