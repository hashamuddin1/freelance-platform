import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { APP_URL } from "../../../config";
import axios from "axios";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const changeEmailAddress = (event) => {
    setEmailAddress(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      if (emailAddress === "" || password === "") {
        setIsLoading(false);
        return simulateError("First Fill All The Fields");
      }

      const response = await axios.post(`${APP_URL}/api/userSignIn`, {
        emailAddress,
        password,
        role: "client",
      });
      if (response.data.success === true) {
        const token = response.data.token;

        const checkToken = localStorage.getItem("token");
        if (checkToken) {
          localStorage.removeItem("token");
        }

        localStorage.setItem("token", token);
        if (message === "First Complete Your Profile") {
          navigate("/completeprofile/Client");
        }

        setIsLoading(false);
        return showSuccessModal("Client Sign In Successfully");
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
      <BasicLayout image={bgImage}>
        <Card>
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={2}
            mt={-3}
            p={2}
            mb={1}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Sign in
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput
                  value={emailAddress}
                  onChange={changeEmailAddress}
                  type="email"
                  label="Email"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  value={password}
                  onChange={changePassword}
                  type="password"
                  label="Password"
                  fullWidth
                />
              </MDBox>

              <MDBox mt={4} mb={1}>
                <MDButton onClick={submitResult} variant="gradient" color="info" fullWidth>
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "sign in"}
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/client-signup"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Basic;
