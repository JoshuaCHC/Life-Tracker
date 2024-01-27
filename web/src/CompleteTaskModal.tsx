import { Modal, TextInput, Button, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { ScheduledTask } from "./models/tasks";
import { useCompleteScheduledTaskMutation } from "./hooks/scheduledTasksService";
import { useState } from "react";

type CompleteTaskModalProps = {
  opened: boolean;
  close: () => void;
  selectedEvent: ScheduledTask | undefined;
};

export const CompleteTaskModal = ({
  opened,
  close,
  selectedEvent,
}: CompleteTaskModalProps) => {
  const [completedInMinutes, setCompletedInMinutes] = useState(0);
  const completeTask = useCompleteScheduledTaskMutation();
  const isComplete = new Date(selectedEvent?.completedDate!).getTime() > 0;
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Complete Task"
    >
      <Stack gap={"8px"}>
        <TextInput
          value={selectedEvent?.name}
          label="Title"
          readOnly
        />
        <DateInput
          value={new Date(selectedEvent?.dueDate!)}
          label="Due Date"
          readOnly
        />
        <TextInput
          type="number"
          label="Completed In Minutes"
          defaultValue={selectedEvent?.completedInMinutes}
          onChange={(e) => setCompletedInMinutes(Number(e.target.value))}
          readOnly={isComplete}
        />
        <Button
          onClick={() => {
            completeTask.mutate({
              id: selectedEvent?.id!,
              completedDate: new Date(),
              completedInMinutes: completedInMinutes, //TODO ADD SOMETHING TO HANDLE THIS
              referenceTaskId: selectedEvent?.referenceTaskId!,
            });
            close();
          }}
          disabled={isComplete}
        >
          Complete Task
        </Button>
      </Stack>
    </Modal>
  );
};