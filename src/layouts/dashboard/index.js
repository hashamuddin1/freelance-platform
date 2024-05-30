// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

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

//datagrid
import { DataGrid } from "@mui/x-data-grid";

//getprofile
import TextField from "@mui/material/TextField";

const pages = [
  { page: "Home", link: "dashboard" },
  { page: "Orders", link: "clientOrder" },
  { page: "Card", link: "ClientCard" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "ClientName",
    headerName: "Client Name",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    editable: true,
  },
  {
    field: "date",
    headerName: "Date",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", ClientName: "Jon", price: 14, date: "2024-05-23", status: "Complete" },
  {
    id: 2,
    lastName: "Lannister",
    ClientName: "Cersei",
    price: 31,
    date: "2023-04-23",
  },
  {
    id: 3,
    lastName: "Lannister",
    ClientName: "Jaime",
    price: 31,
    date: "2024-07-23",
  },
  {
    id: 4,
    lastName: "Stark",
    ClientName: "Arya",
    price: 11,
    date: "2024-05-26",
  },
  {
    id: 5,
    lastName: "Targaryen",
    ClientName: "Daenerys",
    price: 55,
    date: "2024-05-20",
  },
  {
    id: 6,
    lastName: "Melisandre",
    ClientName: null,
    price: 150,
    date: "2022-05-23",
  },
  {
    id: 7,
    lastName: "Clifford",
    ClientName: "Ferrara",
    price: 44,
    date: "2024-05-23",
  },
  {
    id: 8,
    lastName: "Frances",
    ClientName: "Rossini",
    price: 36,
    date: "2024-05-23",
  },
  {
    id: 9,
    lastName: "Roxie",
    ClientName: "Harvey",
    price: 65,
    date: "2024-05-23",
  },
];

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

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
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard color="dark" icon="weekend" title="Total Orders" count={281} />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard icon="leaderboard" title="Pending Orders" count="2,300" />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Completed Order"
                count="34k"
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
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
      <MDBox mt={4.5}></MDBox>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
