import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../client";
import { EventTask } from "../models/tasks";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useAddEventTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventTask: EventTask) => client.post('/Event', eventTask), 
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.EVENT_TASKS);
    },
  })
};

export const useGetEventTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.EVENT_TASKS,
    queryFn: () => client.get<EventTask[]>('/Event').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}