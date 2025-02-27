import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Sidebar toggle icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile dropdown icon
import { useNavigate } from "react-router-dom"; // For redirection
import AdminPortor from "./popularhunt";
import NewHunt from "./newhunt";
import TopOffer from "./topoffer";
import AdminEdits from "./admindisplay";
import AdminMessage from "../admin-dashboard/message-admin";
import AdminMessageEdit from "../admin-dashboard/admineditmessage";
import ADDAdminProject from '../admin-dashboard/adding-project'
import ADMINEditProject from '../admin-dashboard/admin-project-edit'

const drawerWidth = 240;
const mobileDrawerWidth = 150;

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // Hook for redirection

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    if (isMobile) setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    navigate("/"); // Redirect to home page
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ADMIN
          </Typography>

          {/* Profile Dropdown Icon */}
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircleIcon />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: isMobile ? mobileDrawerWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? mobileDrawerWidth : drawerWidth,
            boxSizing: "border-box",
            mt: 8,
          },
        }}
        anchor="left"
      >
        <List>
          {[
            "Popular Hunt",
            "New Hunt",
            "Top Offer",
            "Admin Edits",
            "Admin Message",
            "Message Edit",
            "Add Project",
            "Edit Project"
          ].map((text) => (
            <ListItem button key={text} onClick={() => handleMenuClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: `calc(100% - ${isMobile ? mobileDrawerWidth : drawerWidth}px)`,
        }}
      >
        <Toolbar />
        <Box>
          {activeComponent === "Popular Hunt" && <AdminPortor />}
          {activeComponent === "New Hunt" && <NewHunt />}
          {activeComponent === "Top Offer" && <TopOffer />}
          {activeComponent === "Admin Edits" && <AdminEdits />}
          {activeComponent === "Admin Message" && <AdminMessage />}
          {activeComponent === "Message Edit" && <AdminMessageEdit />}
          {activeComponent === "Add Project" && <ADDAdminProject />}
          {activeComponent === "Edit Project" && <ADMINEditProject />}
          {activeComponent === null && (
            <Typography paragraph>
              Welcome to the dashboard! Here you can display your main content like charts, tables, or analytics.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
