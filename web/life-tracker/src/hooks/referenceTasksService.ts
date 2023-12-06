import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "../client";
import { ReferenceTask } from "../models/tasks";
import { QUERY_KEYS } from "../constants/queryKeys";

export const useAddReferenceTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (referenceTask: ReferenceTask) => client.post('/ReferenceTask', referenceTask), 
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.REFERENCE_TASKS);
      queryClient.invalidateQueries(QUERY_KEYS.SCHEDULED_TASKS)
    },
  })
};

export const useGetReferenceTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.REFERENCE_TASKS,
    queryFn: () => client.get<ReferenceTask[]>('/ReferenceTask').then(resp => resp.data),
    refetchOnWindowFocus: false
  })
}