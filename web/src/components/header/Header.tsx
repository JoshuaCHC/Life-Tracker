import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Life Tracker
      </Typography>

      <IconButton size="large" color="inherit">
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
);
