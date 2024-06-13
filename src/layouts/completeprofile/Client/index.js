// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { APP_URL } from "../../../config";
import axios from "axios";
import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Client() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      if (description === "" || phoneNumber === "") {
        setIsLoading(false);
        return simulateError("First Fill All The Fields");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/client-signup");
      }

      const response = await axios.post(
        `${APP_URL}/api/completeProfile`,
        {
          phoneNumber: phoneNumber,
          description: description,
        },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        setIsLoading(false);
        return showSuccessModal("Client Complete Profile Successfully");
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
      navigate("/dashboard");
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
      <CoverLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Complete Your Profile
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              Enter your details
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={description}
                  onChange={handleDescription}
                  label="Description"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  label="Phone Number"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton onClick={submitResult} variant="gradient" color="info" fullWidth>
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create Profile"}
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Client;
