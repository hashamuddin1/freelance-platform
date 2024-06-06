// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FormControl from "@mui/material/FormControl";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";
import { APP_URL } from "../../../config";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Basic() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitAnswers, setSubmitAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitResult = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/first-page");
      }
      const response = await axios.post(
        `${APP_URL}/api/submitQuiz`,
        { arr: submitAnswers },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success === true) {
        if (response.data.message === "You failed this exam") {
          return simulateError("You failed this exam");
        } else if (response.data.message === "You pass this exam") {
          return showSuccessModal("You pass this exam");
        }
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
      navigate("/agent-dashboard");
    }, 3000);
  };

  const simulateError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/authentication/first-page");
    }
    const fetchData = async () => {
      const response = await axios.get(`${APP_URL}/api/getQuizQuestion`, {
        headers: {
          "x-access-token": `${token}`,
        },
      });
      if (response.data.data) {
        setData(response.data.data);
        const ans = response.data.data.map((el) => {
          return {
            selectValue: "",
            rightAnswer: el.rightAnswer,
          };
        });
        setSubmitAnswers(ans);
        console.log(response.data.data);
      }
    };
    fetchData();
  }, []);

  const handleChangeOption = (value, index) => {
    let dat = [...submitAnswers];
    console.log(dat, "DAT");
    dat[index].selectValue = value;
    setSubmitAnswers(dat);
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
              Complete Your Quiz
            </MDTypography>
            <MDTypography display="block" variant="button" color="white" my={1}>
              You must pass this quiz
            </MDTypography>
          </MDBox>
          <form>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                {data.map((question, index) => (
                  <MDBox key={index} mb={2}>
                    <h6>{question.question}</h6>
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={(e) => {
                          handleChangeOption(e.target.value, index);
                        }}
                      >
                        <FormControlLabel
                          value={question.optionA}
                          control={<Radio />}
                          label={question.optionA}
                          required
                        />
                        <FormControlLabel
                          value={question.optionB}
                          control={<Radio />}
                          label={question.optionB}
                          required
                        />
                        <FormControlLabel
                          value={question.optionC}
                          control={<Radio />}
                          label={question.optionC}
                          required
                        />
                      </RadioGroup>
                    </FormControl>
                  </MDBox>
                ))}

                <MDBox mt={4} mb={1}>
                  <MDTypography
                    component={Link}
                    to="/agent-dashboard"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    <MDButton onClick={submitResult} variant="gradient" color="info" fullWidth>
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                    </MDButton>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </form>
        </Card>
      </CoverLayout>
    </>
  );
}

export default Basic;
