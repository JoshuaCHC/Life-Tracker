import { Button } from "@mui/material"
import { useLogin } from "./hooks/data/loginService"

export const Home = () => {
  const login = useLogin()
  return <>
  <p>Home page</p>
  <Button onClick={() => login.mutate()}>Login</Button>
  </>
}