import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from '../../client';
import { QUERY_KEYS } from '../../constants/queryKeys';
import { CompleteScheduledTaskDto, ScheduledTaskDto } from '../../models/dtos/taskDtos';

export const useGetScheduledTasksQuery = () =>
  useQuery({
    queryKey: QUERY_KEYS.SCHEDULED_TASKS,
    queryFn: () => client.get<ScheduledTaskDto[]>('Events/ScheduledTask').then((resp) => resp.data),
    refetchOnWindowFocus: false,
  });

export const useCompleteScheduledTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (completedTask: CompleteScheduledTaskDto) => {
      const createDto = {
        ...completedTask,
        completedDate: completedTask.completedDate?.toISOString(),
      };
      return client.post('Events/ScheduledTask', createDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.SCHEDULED_TASKS);
    },
  });
};
