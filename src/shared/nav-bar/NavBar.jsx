import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, NavLink } from "react-router-dom";
import img from "../../assets/coffee-logo.png";
import NavItem from "../../component/NavItem";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Badge, Button } from "@mui/joy";
import { baseURL } from "../../utils/baseURL";
import Aos from "aos";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useStoreState((state) => state.currentUser);
  const { fetchCurrentUser } = useStoreActions((actions) => actions.currentUser);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (user?.email) {
      baseURL.get(`/api/carts/${user?._id}`).then((res) => {
        setCarts(res.data);
      });
    }
  }, [user?.email]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const handleLogout = () => {
    localStorage.removeItem("jwt-access-token");
    fetchCurrentUser();
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  Aos.init({
    duration: 1200,
  });

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          height: 90,
          display: "flex",
          justifyContent: "space-around",
          bgcolor: "rgba(68,42,107, 0.96)",
        }}
      >
        <Link
          data-aos="zoom-out"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginLeft: 50,
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

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <NavItem carts={carts} user={user} />
          </Menu>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-evenly" }}>
          <NavItem carts={carts} user={user} />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton data-aos="zoom-out" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem
              onClick={handleCloseUserMenu}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              {user.email ? (
                <NavLink to="/auth/login" onClick={handleLogout} style={{ textDecoration: "none" }}>
                  <Button sx={{ display: "block", fontSize: "1.2rem" }}>Log Out</Button>
                </NavLink>
              ) : (
                <NavLink to="/auth/login" style={{ textDecoration: "none" }}>
                  <Button sx={{ display: "block", fontSize: "1.2rem" }}>Login</Button>
                </NavLink>
              )}
              <NavLink to="/auth/register" style={{ textDecoration: "none" }}>
                <Button sx={{ display: "block", fontSize: "1.2rem" }}>Register</Button>
              </NavLink>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
