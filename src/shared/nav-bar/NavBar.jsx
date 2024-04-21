import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import img from "../../assets/coffee-logo.png";
import NavItem from "../../component/NavItem";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Link
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
          <Typography variant="h4">Coffee House</Typography>
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
            <NavItem
              nav="Products"
              onClick={handleCloseNavMenu}
              color={"black"}
              route={"/products"}
            />
            <NavItem
              nav="Dashboard"
              onClick={handleCloseNavMenu}
              color={"black"}
              route={"/dashboard"}
            />
            <NavItem nav="Cart" onClick={handleCloseNavMenu} color={"black"} route={"/cart"} />
          </Menu>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "space-evenly" }}>
          <NavItem nav="Products" color={"white"} route={"/products"} />
          <NavItem nav="Dashboard" color={"white"} route={"/dashboard"} />
          <NavItem nav="Cart" color={"white"} route={"/cart"} />
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;

{
  /* <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "fles", justifyContent: "space-between" }}>
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

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                <NavItem
                  nav="Products"
                  onClick={handleCloseNavMenu}
                  color={"black"}
                  route={"/products"}
                />
                <NavItem
                  nav="Dashboard"
                  onClick={handleCloseNavMenu}
                  color={"black"}
                  route={"/dashboard"}
                />
                <NavItem nav="Cart" onClick={handleCloseNavMenu} color={"black"} route={"/cart"} />
              </Menu>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              <NavItem nav="Products" color={"white"} route={"/products"} />
              <NavItem nav="Dashboard" color={"white"} route={"/dashboard"} />
              <NavItem nav="Cart" color={"white"} route={"/cart"} />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="R" src="/static/images/avatar/2.jpg" />
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
                <MenuItem>
                  {isLogin ? (
                    <Typography textAlign="center">Log out</Typography>
                  ) : (
                    <Link to="/auth/login">
                      <Typography textAlign="center">Login</Typography>
                    </Link>
                  )}
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar> */
}
