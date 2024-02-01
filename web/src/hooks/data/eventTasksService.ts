import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../../client";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { EventTaskCreateDto, EventTaskDto } from "../../models/dtos/taskDtos";

export const useAddEventTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventTask: EventTaskCreateDto) => {
      const model = { ...eventTask, startDate: eventTask.startDate?.toISOString(), endDate: eventTask.endDate?.toISOString()}
      return client.post('/Events', model)
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.EVENT_TASKS);
    },
  })
};

export const useGetEventTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENT_TASKS,
    queryFn: () => client.get<EventTaskDto[]>('/Events').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}