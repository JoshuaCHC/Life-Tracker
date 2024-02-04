import { useForm, Controller } from "react-hook-form";
import { useAddEventTask } from "../../hooks/data/eventTasksService";
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { InputFactory } from "../InputFactory";
import { dateFields, textFields } from "./CreateEventDialogFields";
import { EventDateFields, EventTaskCreateDto } from "../../models/dtos/taskDtos";
import dayjs from "dayjs";
import { useEffect } from "react";

type CreateEventDialogProps = {
  opened: boolean;
  close: () => void;
  newEvent: EventDateFields | undefined;
};

export const CreateEventDialog = ({
  opened,
  close,
  newEvent,
}: CreateEventDialogProps) => {
  const createEvent = useAddEventTask();

  const { control, handleSubmit, reset, watch, setValue } = useForm<EventTaskCreateDto>({
    values: { allDay: newEvent?.allDay ?? false, startDate: newEvent?.startDate, endDate: newEvent?.endDate, title: "", location: "", expectedCost: undefined },
  });

  const closeDialog = () => {
    reset()
    close()
  }

  const onSubmit = (data: EventTaskCreateDto) => {
    createEvent.mutate(data)
    closeDialog()
  };

  useEffect(() => {
    if(watch("allDay").valueOf()){
      const newDate = dayjs(watch('startDate')?.valueOf()).add(1, 'day')
      setValue("endDate", newDate)
    }
  }, [watch("allDay").valueOf(), watch('startDate')?.valueOf()])

  return (
    <Dialog
      open={opened}
      onClose={closeDialog}
    >
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <Stack
          gap={"12px"}
          sx={{ pt: "8px" }}
        >
          {textFields.map((value) => (
            <Controller
              name={value.name as keyof EventTaskCreateDto}
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
                name={value.name as keyof EventTaskCreateDto}
                control={control}
                render={({ field }) =>
                  (
                    <InputFactory
                      field={field}
                      label={value.label}
                      type={value.type}
                      disabled={
                        value.name === "endDate" && watch("allDay").valueOf()
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
        <Button onClick={closeDialog}>Close</Button>
        <Button onClick={handleSubmit(onSubmit)}>Create Event</Button>
      </DialogActions>
    </Dialog>
  );
};