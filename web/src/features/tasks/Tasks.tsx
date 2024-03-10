import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  CreateReferenceTaskDto,
  ReferenceTaskDto,
} from '../../models/dtos/taskDtos';
import {
  useAddReferenceTask,
  useGetReferenceTasks,
} from '../../hooks/data/referenceTasksService';
import { InputFactory } from '../../components/InputFactory';
import { defaultCreateReferenceTaskDto } from '../../models/dtos/emptyDtos';

export const Tasks = () => {
  const referenceTasks = useGetReferenceTasks();
  const addReferenceTask = useAddReferenceTask();

  const { control, handleSubmit, reset } = useForm<CreateReferenceTaskDto>({
    defaultValues: defaultCreateReferenceTaskDto,
  });

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
    },
    {
      name: 'recurDays',
      label: 'Pick when task should recur',
      type: 'select',
      data: [
        { value: '0', label: 'Never' },
        { value: '1', label: 'Every day' },
        { value: '2', label: 'Every 2 days' },
        { value: '3', label: 'Every 3 days' },
        { value: '7', label: 'Every week' },
        { value: '14', label: 'Every fortnight' },
        { value: '30', label: 'Every month' },
      ],
    },
  ];

  const theme = useTheme();

  const onSubmit = (data: CreateReferenceTaskDto) => {
    addReferenceTask.mutate(data);
    reset();
  };
  // TODO make this into a form using react hook form to make it easier to use
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <Paper
          elevation={2}
          sx={{
            background: theme.palette.background.paper,
            borderRadius: '4px',
            p: '16px',
          }}
        >
          <Typography> Add new task</Typography>
          <Stack gap="12px" sx={{ pt: '8px' }}>
            {fields.map((value) => (
              <Controller
                name={value.name as keyof CreateReferenceTaskDto}
                control={control}
                render={({ field }) =>
                  (
                    <InputFactory
                      field={field}
                      label={value.label}
                      type={value.type}
                      data={value.data}
                    />
                  ) ?? <> </>
                }
              />
            ))}
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{ width: '100%' }}
              variant="outlined"
            >
              Add task
            </Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper
          elevation={2}
          sx={{
            background: theme.palette.background.paper,
            borderRadius: '4px',
            p: '16px',
          }}
        >
          <Stack gap="16px">
            {referenceTasks.data?.map((task: ReferenceTaskDto) => (
              <Card
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  borderColor: 'grey.200',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  p: 2,
                  background: theme.palette.grey[50],
                }}
              >
                <Typography variant="h5">{task.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body1">
                    Description: {task.description}
                  </Typography>
                  <Typography variant="body1">
                    {`Start date: ${new Date(task.startDate).toLocaleDateString(
                      'en-AU',
                      {
                        day: 'numeric',
                        month: 'long',
                      }
                    )}`}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};
