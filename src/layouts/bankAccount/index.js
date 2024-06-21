import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
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
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { APP_URL } from "../../config";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

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

const pages = [
  { page: "Profile", link: "agent-dashboard" },
  { page: "Orders", link: "agentOrder" },
  { page: "Bank Account", link: "BankAccount" },
  { page: "Contact Admin", link: "ContactAdmin" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function BankAccount() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(false);

  const SkeletonTable = () => (
    <div style={{ height: 450, width: "100%" }}>
      {[...Array(10)].map((_, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <Skeleton variant="rectangular" height={30} animation="wave" />
        </div>
      ))}
    </div>
  );

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }
      const response = await axios.post(
        `${APP_URL}/api/insertBank`,
        {},
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        setIsLoading(false);
        return showSuccessModal("Bank Added Successfully");
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      setIsLoading(false);
      return simulateError(message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/authentication/first-page");
    }

    const fetchKPIData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/api/totalEarningKPI`, {
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
    fetchKPIData();
  }, []);

  const showSuccessModal = (successMessage) => {
    setSuccess(successMessage);
    setTimeout(() => {
      setSuccess(null);
      setOpen(false);
    }, 3000);
  };
  const simulateError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
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
          <Grid container spacing={3} py={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Total Earning"
                  count={data}
                />
              </MDBox>
            </Grid>
          </Grid>
          <Button onClick={handleOpen}>ADD BANK ACCOUNT</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Bank Account Detail
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  style={{ marginBottom: 10 }}
                  id="outlined-basic"
                  label="Bank Name"
                  variant="outlined"
                />
                <TextField
                  style={{ marginBottom: 10 }}
                  id="outlined-basic"
                  label="Account Number"
                  variant="outlined"
                />
                <TextField
                  style={{ marginBottom: 10 }}
                  id="outlined-basic"
                  label="Branch Name"
                  variant="outlined"
                />
              </Typography>
              <Button variant="contained" onClick={submitResult} style={{ color: "white" }}>
                Save
              </Button>
            </Box>
          </Modal>
        </DashboardLayout>
      </>
    );
  }
}
