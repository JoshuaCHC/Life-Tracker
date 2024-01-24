import { useMutation, useQuery, useQueryClient } from "react-query"
import { client } from "../client"
import { QUERY_KEYS } from "../constants/queryKeys"
import { CompleteScheduledTask, ScheduledTask } from "../models/tasks"

export const useGetScheduledTasksQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SCHEDULED_TASKS,
    queryFn: () => client.get<ScheduledTask[]>('/ScheduledTask').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}

export const useCompleteScheduledTaskMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (completedTask: CompleteScheduledTask) => client.post('/ScheduledTask', completedTask), 
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.SCHEDULED_TASKS)
    },
  })
}