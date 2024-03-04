import { useQueryClient, useMutation } from "react-query";
import { client } from "../../client";
import Cookies from 'universal-cookie';

export const useLogin = () => {
  return useMutation({
    mutationFn: () => client.post('Login').then((resp) => resp.data), 
    onSuccess: (data) => {
      const cookie = new Cookies()
      cookie.set('access_token', data, {
        path: '/',
        httpOnly: true,
        secure: false // Set to true if using HTTPS
      });
    },
  })
}