import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AppBar, DrawerHeader, Main } from "../component/UI/mui-styled/mui-dashboard";
import NavItem from "../component/NavItem";
import { Link, Outlet } from "react-router-dom";
import img from "../assets/coffee-logo.png";

const drawerWidth = 220;

const DashboardLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} theme={theme}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "block", mr: 24 }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            to="/"
          >
            <Box
              component="img"
              sx={{
                height: 50,
                display: "flex",
                overflow: "hidden",
              }}
              src={img}
              alt=""
            />
            <Typography variant="h5">Coffee House</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader theme={theme}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavItem nav={"Add Item"} color={"black"} route={"/dashboard/additem"} />
          <NavItem nav={"Users"} color={"black"} route={"/dashboard/users"} />
          <NavItem nav={"Products"} color={"black"} route={"/dashboard/products"} />
        </List>
      </Drawer>
      <Main open={open} theme={theme}>
        <DrawerHeader theme={theme} />
        <Outlet />
      </Main>
    </Box>
  );
};

export default DashboardLayout;
