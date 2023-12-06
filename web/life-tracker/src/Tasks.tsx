import { useQuery, useMutation, useQueryClient } from "react-query";
import { client } from "./client";
import {
  Grid,
  Paper,
  NumberInput,
  Button,
  Card,
  Badge,
  Group,
  Text,
  Stack,
  TextInput,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { OriginTask } from "./originTask";

export const Tasks = () => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [numDays, setNumDays] = useState("");

  const query = useQuery("tasks", async () => {
    const data = await client.get<OriginTask[]>("/tasks");
    return data;
  });

  const mutation = useMutation(
    async () => {
      await client.post(`/task`, {
        taskName: taskName,
        taskDescription: description,
        startDate: startDate,
        rescheduleInDays: parseInt(numDays),
        id: 0,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );

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
            ]}
            value={numDays}
            onChange={(e) => setNumDays(e ?? "0")}
            pb="8px"
          />
          <Button
            onClick={() => {
              mutation.mutate();
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
            {query.data?.data.map((task: OriginTask) => {
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
                    <Text fw={500}>{task.taskName}</Text>
                  </Group>
                  <Text
                    size="sm"
                    c="dimmed"
                  >
                    Description: {task.taskDescription}
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
