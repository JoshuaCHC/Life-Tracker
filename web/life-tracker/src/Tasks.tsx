import {
  Grid,
  Paper,
  Button,
  Card,
  Group,
  Text,
  Stack,
  TextInput,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { ReferenceTask } from "./models/tasks";
import { useAddReferenceTask, useGetReferenceTasks } from "./hooks/referenceTasksService";

export const Tasks = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [numDays, setNumDays] = useState("");

  const referenceTasks = useGetReferenceTasks();
  const addReferenceTask = useAddReferenceTask();
  
  //TODO make this into a form using react hook form to make it easier to use
  return (
    <Grid
      gutter={{ base: "16px" }}
      h="100%"
    >
      <Grid.Col span={3}>
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          bg="#F8FAFC"
        >
          <TextInput
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            label="Task name"
            pb="8px"
          />
          <TextInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            pb="8px"
          />
          <DateInput
            value={startDate}
            onChange={setStartDate}
            label="Start date"
            placeholder="Select start date"
            pb="8px"
          />
          <Select
            label="Recurs"
            placeholder="Pick when task should recur"
            data={[
              { value: "0", label: "Never" },
              { value: "1", label: "Every day" },
              { value: "2", label: "Every 2 days" },
              { value: "3", label: "Every 3 days" },
              { value: "7", label: "Every week" },
              { value: "14", label: "Every fornight" },
              { value: "30", label: "Every month" },
            ]}
            value={numDays}
            onChange={(e) => setNumDays(e ?? "0")}
            pb="8px"
          />
          <Button
            onClick={() => {
              if(!startDate || !numDays){
                return; 
              }
              addReferenceTask.mutate({ name: taskName, description: description, startDate: startDate, recurDays: parseInt(numDays), id: 0});
              setTaskName("");
            }}
          >
            Add task
          </Button>
        </Paper>
      </Grid.Col>
      <Grid.Col
        span={6}
        w="100%"
        h="100%"
        mb="xl"
      >
        <Paper
          shadow="md"
          radius="lg"
          p="xl"
          bg="#F8FAFC"
        >
          <Stack gap={"16px"}>
            {referenceTasks.data?.map((task: ReferenceTask) => {
              return (
                <Card
                  radius="lg"
                  p="xl"
                  bg="#F8FAFC"
                  withBorder
                >
                  <Group
                    justify="space-between"
                    mt="md"
                    mb="xs"
                  >
                    <Text fw={500}>{task.name}</Text>
                  </Group>
                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Description: {task.description}
                  </Text>
                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Start date: {task.startDate.toString()}
                  </Text>
                </Card>
              );
            })}
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
