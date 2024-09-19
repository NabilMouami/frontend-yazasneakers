import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadCustomer } from "@/features/customerSlice";

import { config_url } from "@/util/config";
import OtpInput from "react-otp-input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
  const { customerInfo } = useSelector((state) => state.Customer) || {};
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
  const router = useRouter();

  const handleNext = () => {
    if (activeStep === 0 && Object.keys(completed).length === 0) {
      alert("You need to create an account first.");
      return;
    }
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

  useEffect(() => {
    if (Object.keys(customerInfo).length === 0) {
      setOpen(true);
    }
  }, [customerInfo?.id]);

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
      setCompleted({ 0: true }); // Mark step 0 as complete
      setActiveStep(1); // Move to the OTP verification step
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${config_url}/api/customers/verify-otp`, {
        email: formValues.email,
        otp,
      });
      handleComplete();
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${config_url}/api/customers/login`, {
        email: formValues.email,
        password: formValues.password,
      });
      if (response.data.token) {
        Cookies.set("token", response.data.token);
        router.reload();
        dispatch(loadCustomer(response.data.results));
        handleComplete();
        setOpen(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
              Créer un compte
            </Button>
            {/* Add the text link to go to "Se connecter" */}
            <Typography sx={{ mt: 2 }} align="center">
              Vous avez déjà un compte ?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setActiveStep(2)} // Navigate directly to step 3 (Se connecter)
              >
                Se connecter
              </span>
            </Typography>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">
              Entrez l'OTP envoyé à votre adresse e-mail
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
              Vérifier l'OTP
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
              Se connecter
            </Button>
            {/* Add the text link to go back to "Créer un compte" */}
            <Typography sx={{ mt: 2 }} align="center">
              Vous n'avez pas encore de compte ?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setActiveStep(0)} // Navigate back to step 1 (Créer un compte)
              >
                Créer un compte
              </span>
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton
                    disabled={index > 0 && !completed[index - 1]} // Disable steps if previous ones aren't completed
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
      </Dialog>
    </React.Fragment>
  );
}
