import { Outlet, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TaskIcon from "@mui/icons-material/Task";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useTheme } from '@mui/material/styles';
const drawerWidth = 240;

export const Layout = () => {
  const fields = [
    {
      icon: <HomeIcon />,
      path: "/",
      label: "Home",
    },
    {
      icon: <TaskIcon />,
      path: "/tasks",
      label: "Tasks",
    },
    {
      icon: <CalendarMonthIcon />,
      path: "/calendar",
      label: "Calendar",
    },
  ];
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Life Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {fields.map((value) => (
              <ListItem
                key={value.path}
                disablePadding
              >
                <ListItemButton onClick={() => navigate(value.path)}>
                  <ListItemIcon>{value.icon}</ListItemIcon>
                  <ListItemText primary={value.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, background: theme.palette.background.default, height: "100%"}}
        
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};