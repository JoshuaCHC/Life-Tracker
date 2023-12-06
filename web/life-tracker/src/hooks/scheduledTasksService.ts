import { useQuery } from "react-query"
import { client } from "../client"
import { QUERY_KEYS } from "../constants/queryKeys"
import { ScheduledTask } from "../models/tasks"

export const useGetScheduledTasksQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SCHEDULED_TASKS,
    queryFn: () => client.get<ScheduledTask[]>('/ScheduledTask').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}