// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import FormControl from "@mui/material/FormControl";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Basic() {
  return (
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
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <h6>What is full form of SEO</h6>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Search Engine Optimization"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Simple Engine Optimization"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Search Engine Optimal"
                  />
                </RadioGroup>
              </FormControl>
            </MDBox>

            <MDBox mb={2}>
              <h6>What is full form of SEO</h6>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Search Engine Optimization"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Simple Engine Optimization"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Search Engine Optimal"
                  />
                </RadioGroup>
              </FormControl>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDTypography
                component={Link}
                to="/agent-dashboard"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                <MDButton variant="gradient" color="info" fullWidth>
                  Submit
                </MDButton>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Basic;
