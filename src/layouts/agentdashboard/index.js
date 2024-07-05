// @mui material components
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components

//appbar
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
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";

//getprofile
import TextField from "@mui/material/TextField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

//style
import "../../App.css";

const pages = [
  { page: "Profile", link: "agent-dashboard" },
  { page: "Orders", link: "agentOrder" },
  { page: "Bank Account", link: "BankAccount" },
  { page: "Contact Admin", link: "ContactAdmin" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Dashboard() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderKPI, setOrderKPI] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "clientId",
      headerName: "Client Name",
      width: 150,
      renderCell: (params) => params.row.clientId.fullName,
    },
    {
      field: "rate",
      headerName: "Rate",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
  ];

  const SkeletonTable = () => (
    <div style={{ height: 450, width: "100%" }}>
      {[...Array(10)].map((_, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <Skeleton variant="rectangular" height={30} animation="wave" />
        </div>
      ))}
    </div>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/authentication/first-page");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/authentication/first-page");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/api/getUserProfile`, {
          headers: {
            "x-access-token": `${token}`,
          },
        });
        const reviewResponse = await axios.get(`${APP_URL}/api/fetchAllReviewsByAgent`, {
          headers: {
            "x-access-token": `${token}`,
          },
        });
        if (response.data.data && reviewResponse.data.data) {
          setReviewData(reviewResponse.data.data);
          setData(response.data.data);
          console.log(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        return simulateError(message);
      }
    };
    fetchData();

    const fetchKPIData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/api/fetchOrderKPIbyAgent`, {
          headers: {
            "x-access-token": `${token}`,
          },
        });
        if (response.data.data) {
          setOrderKPI(response.data.data);
          console.log(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        return simulateError(message);
      }
    };
    fetchKPIData();
  }, []);

  const simulateError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <SkeletonTable />
          </Box>
        </Box>
      </>
    );
  }

  let rows = [];
  if (reviewData) {
    rows = reviewData.map(({ _id, clientId, rate, description }) => ({
      clientId,
      rate,
      description,
      id: _id,
    }));
  }

  if (data && orderKPI && reviewData) {
    return (
      <>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
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
                          color="black"
                          fontWeight="medium"
                        >
                          {page.page}
                        </MDTypography>
                      </MenuItem>
                    ))}
                    <Button variant="contained" onClick={handleLogout} className="btn">
                      Logout
                    </Button>
                  </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} className="appBar">
                  <div>
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
                  </div>
                  <Button variant="contained" onClick={handleLogout} className="btn">
                    Logout
                  </Button>
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
                    count={orderKPI.pendingOrder}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={1.5}>
                  <ComplexStatisticsCard
                    icon="leaderboard"
                    title="Completed Orders"
                    count={orderKPI.completedOrder}
                  />
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
                  defaultValue={data.fullName}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  style={{ marginRight: 10 }}
                  id="outlined-read-only-input"
                  label="Email Address"
                  defaultValue={data.emailAddress}
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
                {/* <TextField
                  style={{ marginRight: 10 }}
                  id="outlined-read-only-input"
                  label="Price"
                  defaultValue={`$ ${data.price}`}
                  InputProps={{
                    readOnly: true,
                  }}
                /> */}
              </Grid>
            </MDBox>
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
          </MDBox>
        </DashboardLayout>
      </>
    );
  }
}

export default Dashboard;
