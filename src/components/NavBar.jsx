import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import { Link } from "react-router";

export default function NavBar({ userName , handleLogOut}) {
  console.log(userName);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoggingOut =()=>{
    handleCloseUserMenu();
    sessionStorage.removeItem('loggedUser');
    sessionStorage.removeItem('token');
    handleLogOut();
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "var(--dark-gray)" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link to="/">
            <Stack direction="row" alignItems="center">
              <img
                src="./src/assets/TaleTrail_Logo_with_Seamless_Sketch_Integration-removebg-preview.png"
                width={70}
                alt=""
                // srcset=""
              />
              {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
              <Typography
                variant="h6"
                noWrap
                component="p"
                // href="/"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  fontFamily: "Knewave",
                  fontWeight: 400,
                  // letterSpacing: '.3rem',
                  color: "var(--mustard-yellow)",
                  textDecoration: "none",
                  overflow: "visible",
                }}
              >
                TaleTrail
              </Typography>
            </Stack>
          </Link>

          {userName && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userName}
                    src="/static/images/avatar/2.jpg"
                    sx={{ backgroundColor: "var(--mustard-yellow)" }}
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
                <MenuItem onClick={handleLoggingOut}>
                  <Typography sx={{ textAlign: "center" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
