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
import { Button, Stack } from "@mui/joy";
import Aos from "aos";
import NavButton from "../../component/Nav-button/NavButton";

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useStoreState((state) => state.currentUser);
  const { fetchCurrentUser } = useStoreActions((actions) => actions.currentUser);
  const { setUser } = useStoreActions((actions) => actions.currentUser);
  const { fetchCart } = useStoreActions((actions) => actions.carts);
  const { setCarts } = useStoreActions((actions) => actions.carts);
  const { carts } = useStoreState((state) => state.carts);

  useEffect(() => {
    if (user) {
      fetchCart({ userId: user?._id });
    }
  }, [user]);

  useEffect(() => {
    fetchCurrentUser();
  }, [!user]);

  const handleLogout = () => {
    setUser(null);
    setCarts(null);
    localStorage.removeItem("jwt-access-token");
    window.location.reload();
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
          height: 80,
          pl: 1,
          display: "flex",
          gap: 1,
          justifyContent: {
            xs: "flex-start",
            md: "space-evenly",
            lg: "space-around",
          },
          bgcolor: "white",
        }}
      >
        <Link
          data-aos="zoom-out"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
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
          <Typography
            sx={{
              display: "flex",
              gap: 1,
              fontWeight: "bold",

              fontSize: { xs: "20px", sm: "25px", md: "32px", lg: "42px" },
            }}
          >
            <Stack sx={{ color: "#0C1844" }}>Nexus</Stack>{" "}
            <Stack sx={{ color: "red" }}>Coffee</Stack>{" "}
            <Stack sx={{ color: "#0C1844" }}>House</Stack>
          </Typography>
        </Link>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
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
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "space-evenly",
          }}
        >
          <NavItem carts={carts} user={user} />
        </Box>

        {user && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton data-aos="zoom-out" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ border: 1 }}
                  alt={user?.name}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/2048px-Avatar_icon_green.svg.png"
                />
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
                  gap: 1,
                }}
              >
                <>
                  <NavLink to="#" style={{ textDecoration: "none" }}>
                    <NavButton navIcon={"Profile"} />
                  </NavLink>
                  <NavLink
                    to="/auth/login"
                    onClick={handleLogout}
                    style={{ textDecoration: "none" }}
                  >
                    <NavButton navIcon={"Log out"} />
                  </NavLink>
                </>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
