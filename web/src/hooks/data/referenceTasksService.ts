import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../../client";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { CreateReferenceTaskDto, ReferenceTaskDto } from "../../models/dtos/taskDtos";

export const useAddReferenceTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (referenceTask: CreateReferenceTaskDto) => client.post('ReferenceTask', {...referenceTask, recurDays: parseInt(referenceTask.recurDays)}), 
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.REFERENCE_TASKS);
      queryClient.invalidateQueries(QUERY_KEYS.SCHEDULED_TASKS)
    },
  })
};

export const useGetReferenceTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.REFERENCE_TASKS,
    queryFn: () => client.get<ReferenceTaskDto[]>('ReferenceTask').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}