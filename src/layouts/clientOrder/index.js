import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const pages = [
  { page: "Home", link: "dashboard" },
  { page: "Orders", link: "clientOrder" },
  { page: "Card", link: "ClientCard" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
    •
  </Box>
);

export default function ClientOrder() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
    <>
      <DashboardLayout>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
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
                  {pages.map((page) => (
                    <MenuItem key={page.page} onClick={handleCloseNavMenu}>
                      <MDTypography
                        component={Link}
                        to={`/${page.link}`}
                        variant="button"
                        color="white"
                        fontWeight="medium"
                      >
                        {page.page}
                      </MDTypography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <MDTypography
                    component={Link}
                    to={`/${page.link}`}
                    variant="button"
                    color="black"
                    key={page.page}
                    fontWeight="medium"
                    sx={{ marginRight: 5 }}
                  >
                    {page.page}
                  </MDTypography>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
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
          </Container>
        </AppBar>
        <Card sx={{ minWidth: 275, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              John Smith
            </Typography>
            <Typography variant="h5" component="div">
              Project Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              $59
            </Typography>
            <Typography variant="body2">
              Description
              <br />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              John Smith
            </Typography>
            <Typography variant="h5" component="div">
              Project Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              $59
            </Typography>
            <Typography variant="body2">
              Description
              <br />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              John Smith
            </Typography>
            <Typography variant="h5" component="div">
              Project Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              $59
            </Typography>
            <Typography variant="body2">
              Description
              <br />
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, marginBottom: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              John Smith
            </Typography>
            <Typography variant="h5" component="div">
              Project Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              $59
            </Typography>
            <Typography variant="body2">
              Description
              <br />
            </Typography>
          </CardContent>
        </Card>
      </DashboardLayout>
    </>
  );
}
