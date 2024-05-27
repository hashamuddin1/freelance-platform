// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components

//appbar
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MDTypography from "components/MDTypography";

//getprofile
import TextField from "@mui/material/TextField";

const pages = [
  { page: "Profile", link: "agent-dashboard" },
  { page: "Orders", link: "agentOrder" },
  { page: "Bank Account", link: "BankAccount" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Dashboard() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { sales, tasks } = reportsLineChartData;

  return (
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
                    {/* <Typography textAlign="center">{page.page}</Typography> */}
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
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Pending Orders"
                count={281}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="leaderboard" title="Completed Orders" count="2,300" />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}></MDBox>
        <MDBox>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              style={{ marginRight: 10 }}
              id="outlined-read-only-input"
              label="Full Name"
              defaultValue="Kevin"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={{ marginRight: 10 }}
              id="outlined-read-only-input"
              label="Email Address"
              defaultValue="kevin@gmail.com"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={{ marginRight: 10 }}
              id="outlined-read-only-input"
              label="Password"
              defaultValue="12345"
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              style={{ marginRight: 10 }}
              id="outlined-read-only-input"
              label="Account"
              defaultValue="Agent"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
