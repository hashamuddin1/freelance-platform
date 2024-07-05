import React, { useState } from "react";
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
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { APP_URL } from "../../config";
import axios from "axios";
import Alert from "@mui/material/Alert";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

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

export default function ClientCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardNumber, setCardNumber] = React.useState(false);
  const [expYear, setExpYear] = React.useState(false);
  const [expMonth, setExpMonth] = React.useState(false);
  const [cvc, setCvc] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }
      const response = await axios.post(
        `${APP_URL}/api/insertCard`,
        {},
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        setIsLoading(false);
        return showSuccessModal("Card Added Successfully");
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message ? error.response.data.message : error.message;
      setIsLoading(false);
      return simulateError(message);
    }
  };

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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button onClick={handleOpen} style={{ backgroundColor: "blue", color: "white" }}>
            ADD CARD
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Card Detail
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <Cards
                  number={state.number}
                  expiry={state.expiry}
                  cvc={state.cvc}
                  name={state.name}
                  focused={state.focus}
                />
                <form>
                  <input
                    type="text"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={16}
                    style={{
                      width: "200px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      border: "2px solid black",
                      height: "25px",
                    }}
                  />
                  <input
                    type="text"
                    name="cvc"
                    placeholder="Cvc"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={3}
                    style={{
                      width: "200px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      border: "2px solid black",
                      height: "25px",
                    }}
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={12}
                    style={{
                      width: "200px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      border: "2px solid black",
                      height: "25px",
                    }}
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Exp Date"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength={4}
                    style={{
                      width: "200px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      border: "2px solid black",
                      height: "25px",
                    }}
                  />
                </form>
              </div>
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
