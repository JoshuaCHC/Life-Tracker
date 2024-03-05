import { useMutation } from "react-query";
import Cookies from 'universal-cookie';
import client from "../../client";

export const useLogin = () => {
  return useMutation({
    mutationFn: () => client.post('Login').then((resp) => resp.data), 
    onSuccess: (data) => {
      const cookie = new Cookies()
      cookie.set('access_token', data, {
        path: '/',
        secure: false // Set to true if using HTTPS
      });
    },
  })
}