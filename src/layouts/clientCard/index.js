import * as React from "react";
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
export default function ClientCard() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <Button onClick={handleOpen}>ADD CARD</Button>
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
              <TextField
                style={{ marginBottom: 10 }}
                id="outlined-basic"
                label="Card Number"
                variant="outlined"
              />
              <TextField
                style={{ marginBottom: 10 }}
                id="outlined-basic"
                label="Expiry date"
                variant="outlined"
              />
              <TextField
                style={{ marginBottom: 10 }}
                id="outlined-basic"
                label="Expiry Month"
                variant="outlined"
              />
              <TextField
                style={{ marginBottom: 10 }}
                id="outlined-basic"
                label="Cvc"
                variant="outlined"
              />
            </Typography>
            <Button variant="contained" style={{ color: "white" }}>
              Save
            </Button>
          </Box>
        </Modal>
      </DashboardLayout>
    </>
  );
}
