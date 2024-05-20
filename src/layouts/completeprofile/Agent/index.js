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

function Agent() {
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
            Complete Your Profile
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your details
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Experience" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Description" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <h6>Select Your Skills</h6>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Facebook Ads" />
                <FormControlLabel control={<Checkbox />} label="Instagram Ads" />
                <FormControlLabel control={<Checkbox />} label="Google Ads" />
                <FormControlLabel control={<Checkbox />} label="Email Marketing" />
                <FormControlLabel control={<Checkbox />} label="Content Writing" />
                <FormControlLabel control={<Checkbox />} label="SEO" />
              </FormGroup>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Create Profile
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Agent;
