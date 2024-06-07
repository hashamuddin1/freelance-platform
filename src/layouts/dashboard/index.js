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

//appbar
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { APP_URL } from "../../config";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import "../../App.css";

//modal
import Modal from "@mui/material/Modal";

const pages = [
  { page: "Home", link: "dashboard" },
  { page: "Orders", link: "clientOrder" },
  { page: "Card", link: "ClientCard" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [agentData, setAgentData] = useState(null);
  const [agentId, setAgentId] = useState(null);
  const [agentPrice, setAgentPrice] = useState(null);
  const [orderTitle, setOrderTitle] = useState(null);
  const [orderDescription, setOrderDescription] = useState(null);
  const [success, setSuccess] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (agentId, price) => {
    setOpen(true);
    setAgentId(agentId);
    setAgentPrice(price);
  };
  const handleClose = () => setOpen(false);

  const submitResult = async (event) => {
    event.preventDefault();

    try {
      if (orderTitle === null || orderDescription === null) {
        return simulateError("First Fill All The Fields");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }
      const response = await axios.post(
        `${APP_URL}/api/assignOrder`,
        {
          title: orderTitle,
          description: orderDescription,
          agentId: agentId,
          price: agentPrice,
        },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        const checkToken = localStorage.getItem("token");
        return showSuccessModal("Order Created Successfully");
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      return simulateError(message);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullName",
      headerName: "Agent Name",
      width: 150,
      editable: true,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
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
      field: "delete",
      headerName: "Delete",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleOpen(params.row.id, params.row.price);
          }}
          className="hireBtn"
          variant="contained"
          sx={{ backgroundColor: "green", color: "white" }}
        >
          Hire
        </Button>
      ),
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const SkeletonTable = () => (
    <div style={{ height: 450, width: "100%" }}>
      {[...Array(10)].map((_, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <Skeleton variant="rectangular" height={30} animation="wave" />
        </div>
      ))}
    </div>
  );

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
        if (response.data.data) {
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

    const fetchAgentData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/api/getAllAgents`, {
          headers: {
            "x-access-token": `${token}`,
          },
        });
        if (response.data.data) {
          setAgentData(response.data.data);
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
    fetchAgentData();
  }, []);

  const simulateError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
    }, 3000);
  };

  const showSuccessModal = (successMessage) => {
    setSuccess(successMessage);
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const changeOrderTitle = (event) => {
    setOrderTitle(event.target.value);
  };

  const changeOrderDescription = (event) => {
    setOrderDescription(event.target.value);
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

  console.log({ agentData, data });
  if (agentData) {
    rows = agentData.map(({ _id, fullName, emailAddress, price }) => ({
      fullName,
      emailAddress,
      price,
      id: _id,
    }));
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (data) {
    return (
      <>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="filled" severity="success">
            {success}
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
                  <ComplexStatisticsCard
                    color="dark"
                    icon="weekend"
                    title="Total Orders"
                    count={281}
                  />
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
                defaultValue="Client"
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Insert Order Details
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                sx={{ marginBottom: 2 }}
                value={orderTitle}
                onChange={changeOrderTitle}
              />
              <div>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  sx={{ marginBottom: 2 }}
                  variant="outlined"
                  value={orderDescription}
                  onChange={changeOrderDescription}
                />
              </div>
              <Button variant="contained" onClick={submitResult} className="btn">
                Submit
              </Button>
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
}

export default Dashboard;
