"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loadCustomer } from "@/features/customerSlice";

import { config_url } from "@/util/config";
import OtpInput from "react-otp-input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultTheme = createTheme();
const steps = ["Créer un compte", "Vérifier l'OTP", "Se connecter"];

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${config_url}/api/customers`, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        password: formValues.password,
      });

      // If account creation is successful, move to the next step
      handleComplete();
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error (e.g., display a notification to the user)
    }
  };
  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${config_url}/api/customers/verify-otp`, {
        email: formValues.email, // Assuming OTP is verified using email
        otp,
      });

      // If OTP verification is successful, move to the next step
      handleComplete();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Handle error (e.g., display a notification to the user)
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config_url}/api/customers/login`, {
        email: formValues.email, // Ensure you use formValues here
        password: formValues.password,
      });

      // Check if login is successful
      if (response.data.token) {
        Cookies.set("token", response.data.token);
        console.log(response.data);
        dispatch(loadCustomer(response.data.results));

        // If OTP verification or login is successful, move to the next step
        handleComplete(); // Make sure handleComplete is defined and available
        setOpen(false);
      } else {
        // Handle cases where token is not returned (optional)
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Display an error message to the user (optional)
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleCreateAccount}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prenom"
                  autoFocus
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Entrez l'OTP envoyé à votre adresse e-mail{" "}
            </Typography>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input {...props} className="otp-input" />
              )}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleVerifyOtp}
            >
              Vérifier l'OTP{" "}
            </Button>
          </Box>
        );
      case 2:
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formValues.password}
              onChange={handleInputChange}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Login Modal
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Step-by-Step Login"}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    color="inherit"
                    onClick={() => setActiveStep(index)}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            {renderStepContent(activeStep)}
          </Box>
        </DialogContent>
        <DialogActions>
          {activeStep > 0 && (
            <Button onClick={handleBack} color="primary">
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button onClick={handleNext} color="primary">
              Next
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button onClick={handleClose} color="primary">
              Finish
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
