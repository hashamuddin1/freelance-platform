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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "../../config";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

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
  { page: "Home", link: "dashboard" },
  { page: "Orders", link: "clientOrder" },
  { page: "Card", link: "ClientCard" },
  { page: "Contact Admin", link: "ContactAdmin" },
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
  const [data, setData] = useState(null);
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const [description, setDescription] = useState(null);
  const [agentId, setAgentId] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpen = (agentData) => {
    console.log(agentData, "agentData");
    setOpen(true);
    setAgentId(agentData);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }
      const response = await axios.post(
        `${APP_URL}/api/giveRatings`,
        {
          agentId: agentId,
          rate: value,
          description: description,
        },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        return showSuccessModal("Review Added Successfully");
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      return simulateError(message);
    }
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/authentication/first-page");
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${APP_URL}/api/fetchAllOrderByClient`, {
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

  if (data) {
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
          {data.map((data, index) => (
            // eslint-disable-next-line react/jsx-key
            <Card sx={{ minWidth: 275, marginBottom: 4 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {data.agentId.fullName}
                </Typography>
                <Typography variant="h5" component="div">
                  {data.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  $ {data.price}
                </Typography>
                <Typography variant="body2">
                  {data.description}
                  <br />
                  <br />
                </Typography>
                <Typography variant="body2">
                  Status: {data.status}
                  <br />
                </Typography>
                {data.status === "completed" && (
                  <Button
                    variant="contained"
                    style={{ color: "white" }}
                    onClick={() => handleOpen(data.agentId._id)}
                  >
                    Review
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Review
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={handleDescription}
                />
                <br />
                <br />
                <Button variant="contained" style={{ color: "white" }} onClick={handleSubmit}>
                  Submit
                </Button>
              </Typography>
            </Box>
          </Modal>
        </DashboardLayout>
      </>
    );
  }
}
