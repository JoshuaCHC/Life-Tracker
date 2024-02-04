import { useCompleteScheduledTaskMutation } from "../../hooks/data/scheduledTasksService";
import { ScheduledTaskDto, ViewScheduledTaskDto } from "../../models/dtos/taskDtos";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { InputFactory } from "../InputFactory";
import { convertScheduledTaskToViewScheduledTask } from "../../utils/scheduledTaskDtoMapper";

type CompleteTaskDialogProps = {
  opened: boolean;
  close: () => void;
  selectedEvent: ScheduledTaskDto;
};

export const CompleteTaskDialog = ({
  opened,
  close,
  selectedEvent,
}: CompleteTaskDialogProps) => {
  const completeTask = useCompleteScheduledTaskMutation();
  const isComplete = new Date(selectedEvent?.completedDate!).getTime() > 0;

  const { control, handleSubmit, reset } =
    useForm<ViewScheduledTaskDto>({
      values: convertScheduledTaskToViewScheduledTask(selectedEvent),
    });

  const closeDialog = () => {
    reset()
    close()
  }

  const onSubmit = (data: ViewScheduledTaskDto) => {
    const completeTaskBody = {
      id: selectedEvent.id,
      completedDate: data.completedDate,
      completedInMinutes: data.completedInMinutes,
      referenceTaskId: selectedEvent.referenceTaskId
    }
    completeTask.mutate(completeTaskBody)
    closeDialog()
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      readonly: true,
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
      readonly: true,
    },
    {
      name: "completedDate",
      label: "Completed Date",
      type: "date",
      disabled: isComplete
    },
    {
      name: "completedInMinutes",
      label: "Completed In",
      type: "number",
      disabled: isComplete
    },
  ];

  return (
    <Dialog
      open={opened}
      onClose={close}
    >
      <DialogTitle>Complete Task</DialogTitle>
      <DialogContent>
        <Stack
          gap={"12px"}
          sx={{ pt: "8px" }}
        >
          {fields.map((value) => (
            <Controller
              name={value.name as keyof ViewScheduledTaskDto}
              control={control}
              render={({ field }) =>
                (
                  <InputFactory
                    field={field}
                    label={value.label}
                    type={value.type}
                    disabled={value.disabled}
                    isReadOnly={value.readonly}
                  />
                ) ?? <> </>
              }
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
        <Button onClick={handleSubmit(onSubmit)}>Create Event</Button>
      </DialogActions>
    </Dialog>
  );
};