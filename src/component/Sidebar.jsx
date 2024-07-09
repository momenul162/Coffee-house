import React, { useState } from "react";
import { listItemButtonClasses } from "@mui/joy/ListItemButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import img from "../assets/coffee-logo.png";
import ColorSchemeToggle from "../component/Theme/ColorSchemeToggle";
import { closeSidebar } from "../utils/sidebar/sidebar";
import { Link } from "react-router-dom";
import {
  Sheet,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  IconButton,
  Divider,
  Box,
  GlobalStyles,
  Input,
} from "@mui/joy";

const Toggler = ({ renderToggle, children }) => {
  const [open, setOpen] = useState(false);

  console.log(open);

  return (
    <>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
};

const Sidebar = () => {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme?.breakpoints?.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={closeSidebar}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <IconButton variant="soft" color="success" size="sm">
            <Box
              component="img"
              sx={{
                height: 30,
                display: "flex",
                overflow: "hidden",
              }}
              src={img}
              alt="Logo"
            />
          </IconButton>
          <Typography level="title-lg">Nexus ..</Typography>
        </Link>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses?.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme?.vars.radius.sm,
          }}
        >
          <ListItem>
            <Link to="/dashboard/overview" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <HomeRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Overview</Typography>
                </ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/dashboard/orders" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Orders</Typography>
                </ListItemContent>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Product</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <Link to="/dashboard/all-product" style={{ textDecoration: "none" }}>
                    <ListItemButton>All Product</ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/dashboard/add-product" style={{ textDecoration: "none" }}>
                    <ListItemButton>Add Product</ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon sx={{ transform: open ? "rotate(180deg)" : "none" }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem>
                  <Link to="/dashboard/all-user" style={{ textDecoration: "none" }}>
                    <ListItemButton>All User</ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme?.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItemButton>
                <HomeRoundedIcon />
                Home
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Divider />
    </Sheet>
  );
};

export default Sidebar;
