"use client";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
import CartItems from "@/components/elements/CartItems";
import { config_url } from "@/util/config";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Checkout() {
  const { cart } = useSelector((state) => state.shop) || {};
  const { customerInfo } = useSelector((state) => state.Customer) || {};
  const [productList, setProductList] = useState([]);
  const [max_num_order, setMaxOrder] = useState([
    {
      max_num_order: 0,
    },
  ]);
  const [activeStep, setActiveStep] = useState(0);

  console.log(productList);
  let total = 0;
  cart?.forEach((data) => {
    const price = data.item.price;
    total = total + price + 20;
  });

  const [nom, setNom] = useState("");
  const [prenom, setPreNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [appartement, setAppartement] = useState("");
  const [ville, setVille] = useState("");
  const [code_postal, setCodePotal] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");

  const [isLoginToggle, setLoginToggle] = useState(false);
  const handleLoginToggle = () => setLoginToggle(!isLoginToggle);

  const [isCuponToggle, setCuponToggle] = useState(false);
  const handleCuponToggle = () => setCuponToggle(!isCuponToggle);

  const [isCboxToggle, setCboxToggle] = useState(false);
  const handleCboxToggle = () => setCboxToggle(!isCboxToggle);

  const [isShipToggle, setShipToggle] = useState(false);
  const handleShipToggle = () => setShipToggle(!isShipToggle);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });
  const router = useRouter();

  const handleClick = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };
  useEffect(() => {
    axios.get(`${config_url}/api/orders/lastorder/lastnumorder`).then((res) => {
      setMaxOrder(res.data);
    });
  }, []);
  useEffect(() => {
    if (cart) {
      const updatedProductList = cart.map((data) => ({
        productId: data.item.id,
        productSize: data.size,
        productPrice:
          data.item.price_promo === 0
            ? data.item.price
            : data.data?.price_promo,
      }));
      setProductList(updatedProductList);
    }
  }, [cart]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(customerInfo).length === 0) {
      router.push("/sign-in");
      return;
    } else {
      fetch(`${config_url}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_client: nom + " " + prenom,
          customerEmail: email,
          telephone: telephone,
          adresse: adresse,
          ville: ville,
          code_postal: code_postal,
          email: email,
          customer_id: customerInfo.id,
          items: productList,
          total_price: total.toFixed(2),
          payment_status: "COD",
          order_num: max_num_order[0]?.max_num_order + 1,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const theme = createTheme({
    palette: {
      primary: deepOrange,
    },
  });
  const steps = [
    {
      label: "Informations personnelles",
    },
    {
      label: "Adresses",
    },
    {
      label: "Mode de livraison",
    },
    {
      label: "Paiement",
    },
  ];

  function CampaignSettingsForm() {
    return (
      <div className="checkbox-form">
        <div className="row">
          <div className="col-md-12">
            <div className="checkout-form-list">
              <label>
                Prenom <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Prenom:"
                value={prenom}
                onChange={(e) => setPreNom(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="checkout-form-list">
              <label>
                Nom <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Nom:"
                defaultValue={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="checkout-form-list">
              <label>
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                placeholder="Email:"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="checkout-form-list">
              <label>
                Telephone <span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Telephone:"
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
          </div>{" "}
        </div>
      </div>
    );
  }

  function AdGroupForm() {
    return (
      <form>
        <div className="col-md-12">
          <div className="checkout-form-list">
            <label>
              Address <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Street address"
              defaultValue={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="checkout-form-list">
            <input
              type="text"
              placeholder="Apartment, suite, unit etc. (optional)"
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="checkout-form-list">
            <label>
              Ville <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Ville au Maroc"
              onChange={(e) => setVille(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="checkout-form-list">
            <label>
              Code Postal <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Code Postal en ville"
              onChange={(e) => setCodePotal(e.target.value)}
            />
          </div>
        </div>
      </form>
    );
  }
  function AdForm() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-18 col-md-8 delivery-info">
            <span>Livraison à domicile</span>
            <span>24-72H</span>
          </div>
          <div className="col-18 col-md-4 text-md-right delivery-info">
            <span className="delivery-price">35,00 MAD TTC</span>
          </div>
        </div>
      </div>
    );
  }

  function AddPayement() {
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Type De Paiement
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="cod"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="cod"
            control={<Radio />}
            label="Payer comptant à la livraison"
          />
          <FormControlLabel
            value="paid-online"
            control={<Radio />}
            label="CMI, Payer en toute sécurité avec votre carte bancaire."
          />
        </RadioGroup>
      </FormControl>
    );
  }

  return (
    <Fragment>
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Cheackout">
        <div>
          <section
            className="coupon-area pt-80 pb-30 wow fadeInUp"
            data-wow-duration=".8s"
            data-wow-delay=".2s"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="coupon-accordion">
                    {/* ACCORDION START */}
                    <h3>
                      Returning customer?{" "}
                      <span id="showlogin" onClick={handleLoginToggle}>
                        Click here to login
                      </span>
                    </h3>
                    <div
                      id="checkout-login"
                      className="coupon-content"
                      style={{
                        display: `${isLoginToggle ? "block" : "none"}`,
                      }}
                    >
                      <div className="coupon-info">
                        <p className="coupon-text">
                          Quisque gravida turpis sit amet nulla posuere lacinia.
                          Cras sed est sit amet ipsum luctus.
                        </p>
                        <form>
                          <p className="form-row-first">
                            <label>
                              Username or email{" "}
                              <span className="required">*</span>
                            </label>
                            <input type="text" />
                          </p>
                          <p className="form-row-last">
                            <label>
                              Password <span className="required">*</span>
                            </label>
                            <input type="text" />
                          </p>
                          <p className="form-row">
                            <button
                              className="tp-btn tp-color-btn"
                              type="submit"
                            >
                              Login
                            </button>
                            <label>
                              <input type="checkbox" />
                              Remember me
                            </label>
                          </p>
                          <p className="lost-password">
                            <Link href="#">Lost your password?</Link>
                          </p>
                        </form>
                      </div>
                    </div>
                    {/* ACCORDION END */}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="coupon-accordion">
                    {/* ACCORDION START */}
                    <h3>
                      Have a coupon?{" "}
                      <span id="showcoupon" onClick={handleCuponToggle}>
                        Click here to enter your code
                      </span>
                    </h3>
                    <div
                      id="checkout_coupon"
                      className="coupon-checkout-content"
                      style={{
                        display: `${isCuponToggle ? "block" : "none"}`,
                      }}
                    >
                      <div className="coupon-info">
                        <form action="#">
                          <p className="checkout-coupon">
                            <input type="text" placeholder="Coupon Code" />
                            <button
                              className="tp-btn tp-color-btn"
                              type="submit"
                            >
                              Apply Coupon
                            </button>
                          </p>
                        </form>
                      </div>
                    </div>
                    {/* ACCORDION END */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* coupon-area end */}
          {/* checkout-area start */}
          <section
            className="checkout-area pb-50 wow fadeInUp"
            data-wow-duration=".8s"
            data-wow-delay=".2s"
          >
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <ThemeProvider theme={theme}>
                      <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                          {steps.map((step, index) => (
                            <Step key={step.label}>
                              <StepLabel
                                optional={
                                  index === 3 ? (
                                    <Typography variant="caption">
                                      Last step
                                    </Typography>
                                  ) : null
                                }
                              >
                                {step.label}
                              </StepLabel>
                              <StepContent>
                                {index === 0 && <CampaignSettingsForm />}
                                {index === 1 && <AdGroupForm />}
                                {index === 2 && <AdForm />}
                                {index === 3 && <AddPayement />}
                                <Box sx={{ mb: 2 }}>
                                  <div>
                                    <Button
                                      variant="contained"
                                      onClick={handleNext}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      {index === steps.length - 1
                                        ? "Place Order"
                                        : "Continue"}
                                    </Button>
                                    <Button
                                      disabled={index === 0}
                                      onClick={handleBack}
                                      sx={{ mt: 1, mr: 1 }}
                                    >
                                      Back
                                    </Button>
                                  </div>
                                </Box>
                              </StepContent>
                            </Step>
                          ))}
                        </Stepper>
                        {activeStep === steps.length && (
                          <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>
                              All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                              Reset
                            </Button>
                          </Paper>
                        )}
                      </Box>
                    </ThemeProvider>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <div className="your-order mb-30 ">
                      <h3>Your order</h3>
                      <div className="your-order-table table-responsive">
                        <div className="table-content table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="product-thumbnail">Images</th>
                                <th className="cart-product-name">
                                  Produit Nom
                                </th>
                                <th className="cart-product-name">Size</th>
                                <th className="product-price">Unit Price</th>
                                <th className="product-subtotal">Total</th>
                                <th className="product-remove">Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              <CartItems />
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="your-order-table table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th className="product-name">Product</th>
                              <th className="product-total">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="cart_item">
                              <td className="product-name">
                                Vestibulum suscipit{" "}
                                <strong className="product-quantity">
                                  {" "}
                                  × 1
                                </strong>
                              </td>
                              <td className="product-total">
                                <span className="amount">$165.00</span>
                              </td>
                            </tr>
                            <tr className="cart_item">
                              <td className="product-name">
                                Vestibulum dictum magna{" "}
                                <strong className="product-quantity">
                                  {" "}
                                  × 1
                                </strong>
                              </td>
                              <td className="product-total">
                                <span className="amount">$50.00</span>
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr className="cart-subtotal">
                              <th>Cart Subtotal</th>
                              <td>
                                <span className="amount">
                                  {total.toFixed(2)} Dh
                                </span>
                              </td>
                            </tr>
                            <tr className="shipping">
                              <th>Shipping</th>
                              <td>
                                <ul>
                                  <li>
                                    <input type="radio" name="shipping" />
                                    <label>
                                      Flat Rate:{" "}
                                      <span className="amount">$7.00</span>
                                    </label>
                                  </li>
                                  <li>
                                    <input type="radio" name="shipping" />
                                    <label>Free Shipping:</label>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                            <tr className="order-total">
                              <th>Order Total</th>
                              <td>
                                <strong>
                                  <span className="amount">
                                    {total.toFixed(2)} Dh
                                  </span>
                                </strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                      <div className="payment-method">
                        <div className="accordion" id="checkoutAccordion">
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="checkoutOne"
                              onClick={() => handleClick(1)}
                            >
                              <button
                                className={
                                  isActive.key == 1
                                    ? "accordion-button"
                                    : "accordion-button collapsed"
                                }
                              >
                                Direct Bank Transfer
                              </button>
                            </h2>
                            <div
                              id="bankOne"
                              className={
                                isActive.key == 1
                                  ? "accordion-collapse collapse show"
                                  : "accordion-collapse collapse"
                              }
                            >
                              <div className="accordion-body">
                                Make your payment directly into our bank
                                account. Please use your Order ID as the payment
                                reference. Your order won’t be shipped until the
                                funds have cleared in our account.
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="paymentTwo"
                              onClick={() => handleClick(2)}
                            >
                              <button
                                className={
                                  isActive.key == 2
                                    ? "accordion-button"
                                    : "accordion-button collapsed"
                                }
                                type="button"
                              >
                                Cheque Payment
                              </button>
                            </h2>
                            <div
                              id="payment"
                              className={
                                isActive.key == 2
                                  ? "accordion-collapse collapse show"
                                  : "accordion-collapse collapse"
                              }
                            >
                              <div className="accordion-body">
                                Please send your cheque to Store Name, Store
                                Street, Store Town, Store State / County, Store
                                Postcode.
                              </div>
                            </div>
                          </div>
                          <div className="accordion-item">
                            <h2
                              className="accordion-header"
                              id="paypalThree"
                              onClick={() => handleClick(3)}
                            >
                              <button
                                className={
                                  isActive.key == 3
                                    ? "accordion-button"
                                    : "accordion-button collapsed"
                                }
                                type="button"
                              >
                                PayPal
                              </button>
                            </h2>
                            <div
                              id="paypal"
                              className={
                                isActive.key == 3
                                  ? "accordion-collapse collapse show"
                                  : "accordion-collapse collapse"
                              }
                              aria-labelledby="paypalThree"
                              data-bs-parent="#checkoutAccordion"
                            >
                              <div className="accordion-body">
                                Pay via PayPal; you can pay with your credit
                                card if you don’t have a PayPal account.
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="order-button-payment mt-20">
                          <button
                            type="submit"
                            className="tp-btn tp-color-btn w-100 banner-animation"
                            // disabled={Object.keys(customerInfo).length === 0}
                          >
                            Place order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </Layout>
    </Fragment>
  );
}
