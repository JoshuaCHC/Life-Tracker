import { useMutation, useQuery, useQueryClient } from 'react-query';
import { client } from '../../client';
import { QUERY_KEYS } from '../../constants/queryKeys';
import {
  CreateReferenceTaskDto,
  ReferenceTaskDto,
} from '../../models/dtos/taskDtos';

export const useAddReferenceTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (referenceTask: CreateReferenceTaskDto) =>
      client.post('Events/ReferenceTask', {
        ...referenceTask,
        recurDays: parseInt(referenceTask.recurDays, 10),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.REFERENCE_TASKS);
      queryClient.invalidateQueries(QUERY_KEYS.SCHEDULED_TASKS);
    },
  });
};

export const useGetReferenceTasks = () =>
  useQuery({
    queryKey: QUERY_KEYS.REFERENCE_TASKS,
    queryFn: () =>
      client
        .get<ReferenceTaskDto[]>('Events/ReferenceTask')
        .then((resp) => resp.data),
    refetchOnWindowFocus: false,
  });
