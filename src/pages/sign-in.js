"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadCustomer } from "@/features/customerSlice";
import Layout from "@/components/layout/Layout";
import { config_url } from "@/util/config";
import Link from "next/link";
import OtpInput from "react-otp-input";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const MODE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  RESET_PASSWORD: "RESET_PASSWORD",
  EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
  VERIFICATION_OTP: "VERIFICATION_OTP",
};
export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mode, setMode] = useState(MODE.REGISTER);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          response = await axios.post(`${config_url}/api/customers/login`, {
            email,
            password,
          });
          Cookies.set("token", response.data.token);
          console.log(response.data);
          dispatch(loadCustomer(response.data.results));
          router.push("/");
          break;
        case MODE.REGISTER:
          await axios.post(`${config_url}/api/customers`, {
            firstName,
            lastName,
            email,
            password,
          });
          setMessage("Registration successful! Please log in.");
          setMode(MODE.VERIFICATION_OTP); // Switch to OTP verification mode
          break;
        case MODE.VERIFICATION_OTP:
          await axios.post(`${config_url}/api/customers/verify-otp`, {
            email,
            otp, // Send OTP code for verification
          });
          setMessage("Verification successful! Please log in.");
          setMode(MODE.LOGIN); // Switch to login mode after verification
          break;
        // Add other cases for password reset and email verification if needed
        default:
          break;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout headerStyle={3} footerStyle={1}>
        <section className="track-area pt-80 pb-40">
          <div className="container">
            <div className="row justify-content-center">
              {mode === MODE.LOGIN && (
                <div className="col-lg-6 col-sm-12">
                  <div className="tptrack__product mb-40">
                    <form
                      className="tptrack__content grey-bg-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="tptrack__item d-flex mb-20">
                        <div className="tptrack__item-content">
                          <h4 className="tptrack__item-title">Login Here</h4>
                          <p>
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account.
                          </p>
                        </div>
                      </div>
                      <div className="tptrack__id mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-user" />
                          </span>
                          <input
                            type="email"
                            placeholder="Username / email address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="tptrack__email mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-key" />
                          </span>
                          <input
                            type="text"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="tpsign__remember d-flex align-items-center justify-content-between mb-15">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="tpsign__pass">
                          <Link href="#">Forget Password</Link>
                        </div>
                      </div>
                      <div
                        className="tpsign__account"
                        onClick={() => setMode(MODE.REGISTER)}
                      >
                        Create New Account
                      </div>
                      <div className="tptrack__btn">
                        <button className="tptrack__submition" type="submit">
                          Login Now
                          <i className="fal fa-long-arrow-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {mode === MODE.VERIFICATION_OTP && (
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
                  <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Vérifier l'OTP
                  </Button>
                </Box>
              )}

              {mode === MODE.REGISTER && (
                <div className="col-lg-6 col-sm-12">
                  <div className="tptrack__product mb-40">
                    <form
                      className="tptrack__content grey-bg-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="tptrack__item d-flex mb-20">
                        <div className="tptrack__item-icon">
                          <img src="/assets/img/icon/sign-up.png" alt="" />
                        </div>
                        <div className="tptrack__item-content">
                          <h4 className="tptrack__item-title">Sign Up</h4>
                          <p>
                            Your personal data will be used to support your
                            experience throughout this website, to manage access
                            to your account.
                          </p>
                        </div>
                      </div>
                      <div className="tptrack__id mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-user" />
                          </span>
                          <input
                            type="text"
                            placeholder="nom:"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="tptrack__id mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-user" />
                          </span>
                          <input
                            type="text"
                            placeholder="prenom:"
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="tptrack__id mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-envelope" />
                          </span>
                          <input
                            type="email"
                            defaultValue={email}
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="tptrack__email mb-10">
                        <div className="form-sign">
                          <span>
                            <i className="fal fa-key" />
                          </span>
                          <input
                            type="password"
                            defaultValue={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div
                        className="tpsign__account"
                        onClick={() => setMode(MODE.LOGIN)}
                      >
                        Already Have Account?
                      </div>
                      <div className="tptrack__btn">
                        <button
                          className="tptrack__submition tpsign__reg"
                          type="submit"
                        >
                          Register Now
                          <i className="fal fa-long-arrow-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
