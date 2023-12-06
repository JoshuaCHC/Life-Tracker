import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome2 } from "@tabler/icons-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return(
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Home" leftSection={<IconHome2 size="1rem" stroke={1.5} />} active={1===active} onClick={() => {setActive(1); navigate("/")}} variant="subtle"/>
        <NavLink label="Task" leftSection={<IconHome2 size="1rem" stroke={1.5} />} active={4===active} onClick={() => {setActive(2); navigate("/tasks")}} variant="subtle"/>
        <NavLink label="Calendar" leftSection={<IconHome2 size="1rem" stroke={1.5} />} active={5===active} onClick={() => {setActive(3); navigate("/calendar")}} variant="subtle"/>

      </AppShell.Navbar>

      <AppShell.Main bg="#F2F4F6" style={{width: "100%"}}><Outlet/></AppShell.Main>
    </AppShell>)
}