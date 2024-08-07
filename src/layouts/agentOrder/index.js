import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
//appbar
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import MDTypography from "components/MDTypography";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { APP_URL } from "../../config";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

const pages = [
  { page: "Profile", link: "agent-dashboard" },
  { page: "Orders", link: "agentOrder" },
  { page: "Bank Account", link: "BankAccount" },
  { page: "Contact Admin", link: "ContactAdmin" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function AgentOrder() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderKPI, setOrderKPI] = useState(null);
  const [success, setSuccess] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "clientId",
      headerName: "Client Name",
      width: 150,
      renderCell: (params) => params.row.clientId.fullName,
    },
    {
      field: "price",
      headerName: "Price",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
    },
    {
      field: "title",
      headerName: "Title",
      width: 110,
    },
    {
      field: "description",
      headerName: "Description",
      width: 450,
    },
    {
      field: "changeStatus",
      headerName: (params) => (params.row.status === "queue" ? "Accept" : "Change Status"),
      headerAlign: "center",
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleChangeStatus(params.row.id);
          }}
          variant="contained"
          sx={{ backgroundColor: "orange", color: "white" }}
        >
          {params.row.status === "queue" ? "Accept" : "Change Status"}
        </Button>
      ),
    },
  ];

  const handleChangeStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }

      const response = await axios.put(
        `${APP_URL}/api/changeOrderStatus`,
        {
          orderId: orderId,
        },
        {
          headers: {
            "x-access-token": `${token}`,
          },
        }
      );

      setData((prevData) => {
        return prevData.map((order) => {
          if (order._id === orderId) {
            if (order.status == "queue") {
              return { ...order, status: "pending" };
            } else {
              return { ...order, status: "completed" };
            }
          }
          return order;
        });
      });
      showSuccessModal(response.data.message);
    } catch (error) {
      console.error("Delete user error:", error);
    }
  };

  const showSuccessModal = (successMessage) => {
    setSuccess(successMessage);
    setTimeout(() => {
      setSuccess(null);
    }, 3000);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
        const response = await axios.get(`${APP_URL}/api/fetchAllOrderByAgent`, {
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
  if (data) {
    rows = data.map(({ _id, clientId, price, status, title, description }) => ({
      clientId,
      price,
      status,
      title,
      description,
      id: _id,
    }));
  }

  if (data && orderKPI) {
    return (
      <>
        <DashboardLayout>
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
          <Grid container spacing={3} py={3}>
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
          <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>All Orders</h3>
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
      </>
    );
  }
}
