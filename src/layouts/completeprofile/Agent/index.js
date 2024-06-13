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

function Agent() {
  const navigate = useNavigate();
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleExperience = (event) => {
    setExperience(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSkillChange = (event) => {
    const skill = event.target.name;
    if (event.target.checked) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== skill));
    }
  };

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      if (experience === "" || description === "" || phoneNumber === "") {
        setIsLoading(false);
        return simulateError("First Fill All The Fields");
      }
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/sign-up");
      }

      const response = await axios.post(
        `${APP_URL}/api/completeProfile`,
        {
          phoneNumber: phoneNumber,
          description: description,
          experience: experience,
          skills: selectedSkills,
          price: price,
        },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        setIsLoading(false);
        return showSuccessModal("Agent Complete Profile Successfully");
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
      navigate("/authentication/quizAgent");
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
                  value={experience}
                  onChange={handleExperience}
                  label="Experience"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
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
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  value={price}
                  onChange={handlePrice}
                  label="Price"
                  variant="standard"
                  fullWidth
                />
              </MDBox>
              <MDBox mb={2}>
                <h6>Select Your Skills</h6>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="Facebook Ads" />}
                    label="Facebook Ads"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="Instagram Ads" />}
                    label="Instagram Ads"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="Google Ads" />}
                    label="Google Ads"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="Email Marketing" />}
                    label="Email Marketing"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="Content Writing" />}
                    label="Content Writing"
                  />
                  <FormControlLabel
                    control={<Checkbox onChange={handleSkillChange} name="SEO" />}
                    label="SEO"
                  />
                </FormGroup>
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

export default Agent;
