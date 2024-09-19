"use client";
import dynamic from "next/dynamic";

import { Fragment, useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Paper,
  Radio,
  Button,
  StepContent,
  StepLabel,
  Step,
  Stepper,
  Alert,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
const LoginModal = dynamic(() => import("@/components/sections/LoginModal"), {
  loading: () => <p>Loading Login...</p>,
});
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

import Layout from "@/components/layout/Layout";
import Link from "next/link";
const CartItems = dynamic(() => import("@/components/elements/CartItems"), {
  loading: () => <p>Loading...</p>,
});
import { config_url } from "@/util/config";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
export default function Checkout() {
  const { cart } = useSelector((state) => state.shop) || {};
  const { customerInfo } = useSelector((state) => state.Customer) || {};

  const [productList, setProductList] = useState([]);
  console.log(productList);
  const [max_num_order, setMaxOrder] = useState([
    {
      max_num_order: 0,
    },
  ]);
  const [maxCoinsBalance, setMaxCoinsBalance] = useState([
    {
      total_balance: 0,
    },
  ]);
  const [chooisePriceCoins, setChooisePriceCoins] = useState();
  const [coinsUsed, setCoinsUsed] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentType, setPaymentType] = useState("COD");
  const [checkCoins, setCheckCoins] = useState("");

  const [showInputCoins, setShowInputCoins] = useState(false);

  const total = useMemo(() => {
    const sum =
      cart?.reduce((acc, data) => {
        const price =
          data.item.price_promo !== 0 ? data.item.price_promo : data.item.price;
        return acc + price;
      }, 0) || 0;

    return sum < 1000 ? sum + 50 : sum;
  }, [cart]);

  // Calculate the maximum amount of coins that can be used (60% of the total price)
  const maxCoinsAllowed = total * 0.6 * 10;

  // Calculate the actual amount of coins the user can use (lesser of available coins and max allowed)
  const usableCoins = Math.min(
    maxCoinsBalance[0]?.total_balance,
    maxCoinsAllowed
  );

  // Function to handle coin usage
  const handleCoinsChange = (event) => {
    let coins = parseFloat(event.target.value);

    // Ensure coins used don't exceed the usable amount
    if (coins > usableCoins) {
      coins = usableCoins;
    }

    setCoinsUsed(coins);
  };

  const finalPrice = total - coinsUsed;

  const total_original = useMemo(() => {
    const sum =
      cart?.reduce((acc, data) => {
        const price = data.item.price;
        return acc + price;
      }, 0) || 0;

    return sum;
  }, [cart]);
  // const percentage = ((item?.price - item?.price_promo) / item?.price) * 100;

  const total_porcentage = useMemo(() => {
    const sum =
      cart?.reduce((acc, data) => {
        const percentage =
          ((data.item?.price - data.item?.price_promo) / data.item?.price) *
          data.item?.price;
        return acc + percentage;
      }, 0) || 0;

    return sum;
  }, [cart]);

  console.log(total_porcentage);
  const [nom, setNom] = useState(customerInfo.lastName);
  const [prenom, setPreNom] = useState(customerInfo.firstName);
  const [adresse, setAdresse] = useState("");
  const [appartement, setAppartement] = useState("");
  const [ville, setVille] = useState("");
  const [email, setEmail] = useState(customerInfo.email);
  const [telephone, setTelephone] = useState("");
  const [code_postal, setCodePostal] = useState("");
  const [formValidations, setFormValidations] = useState({
    step1: false,
    step2: false,
  });
  const [alert, setAlert] = useState({ visible: false, message: "" });

  const [isLoginToggle, setLoginToggle] = useState(false);

  const handleLoginToggle = () => setLoginToggle(!isLoginToggle);

  const validateStep1 = () => {
    const isValid = telephone.trim() !== "";
    setFormValidations({ ...formValidations, step1: isValid });
    return isValid;
  };

  const validateStep2 = () => {
    const isValid =
      adresse.trim() !== "" && ville.trim() !== "" && code_postal.trim() !== "";
    setFormValidations({ ...formValidations, step2: isValid });
    return isValid;
  };

  const handleNext = () => {
    let isValid = false;
    if (activeStep === 0) {
      isValid = validateStep1();
    } else if (activeStep === 1) {
      isValid = validateStep2();
    } else {
      isValid = true; // Assuming steps 3 and 4 are valid by default or have their own validation logic
    }

    if (isValid) {
      setAlert({ visible: false, message: "" });

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setAlert({
        visible: true,
        message: "Please fill in all required fields before continuing.",
      });
    }
  };
  useEffect(() => {
    if (customerInfo?.id) {
      axios
        .get(`${config_url}/api/coins/${customerInfo.id}`)
        .then((res) => {
          if (res.data && res.data.data) {
            setMaxCoinsBalance(res.data.data);
            console.log(res.data.data);
            setChooisePriceCoins(res.data.data[0]?.total_balance);
          } else {
            console.warn("No data received for coins");
          }
        })
        .catch((error) => {
          console.error("Error fetching coins:", error);
        });
    } else {
      console.warn("customerInfo or customerInfo.id is not available");
    }
  }, [customerInfo]);

  const handleReset = () => {
    setActiveStep(0);
    setFormValidations({ step1: false, step2: false });
    setAlert({ visible: false, message: "" });
  };
  const router = useRouter();

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
            : data.item?.price_promo,
      }));
      setProductList(updatedProductList);
    }
  }, [cart]);

  useEffect(() => {
    if (alert.visible) {
      toast.warning(alert.message, {
        onClose: () => setAlert({ visible: false, message: "" }),
      });
    }
  }, [alert.visible]); // Runs when alert.visible changes

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
    setShowInputCoins(true);
  };

  const handleSubmit = () => {
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
          total_price: (total - coinsUsed / 10).toFixed(2),
          payment_status: paymentType,
          order_num: max_num_order[0]?.max_num_order + 1,
          coins_paid: coinsUsed,
        }),
      })
        .then((response) => response.text())
        .then((data) => {
          router.push("/success");
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

  function AdForm() {
    return (
      <div className="">
        <div className="row">
          <div className="fw-bold col-18 col-md-8 delivery-info">
            <span>Livraison à domicile</span>
            <br />
            <span>24-72H 35,00 MAD TTC</span>
          </div>
        </div>
      </div>
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
                            email <span className="required">*</span>
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
                          <button className="tp-btn tp-color-btn" type="submit">
                            Login
                          </button>
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
            </div>
            <LoginModal />
          </section>
          {/* coupon-area end */}
          {/* checkout-area start */}
          <section
            className="checkout-area pb-50 wow fadeInUp"
            data-wow-duration=".8s"
            data-wow-delay=".2s"
          >
            <div className="container">
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
                              {index === 0 && (
                                <div className="checkbox-form">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="checkout-form-list">
                                        <label>
                                          Prenom{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Prenom:"
                                          defaultValue={prenom}
                                          onChange={(e) =>
                                            setPreNom(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="checkout-form-list">
                                        <label>
                                          Nom{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="Nom:"
                                          defaultValue={nom}
                                          onChange={(e) =>
                                            setNom(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="checkout-form-list">
                                        <label>
                                          Email Address{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="email"
                                          placeholder="Email:"
                                          defaultValue={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="checkout-form-list">
                                        <label>
                                          Telephone{" "}
                                          <span className="required">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          defaultValue={telephone}
                                          placeholder="Telephone:"
                                          onChange={(e) =>
                                            setTelephone(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {index === 1 && (
                                <div>
                                  <div className="col-md-12">
                                    <div className="checkout-form-list">
                                      <label>
                                        Address{" "}
                                        <span className="required">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Street address"
                                        defaultValue={adresse}
                                        onChange={(e) =>
                                          setAdresse(e.target.value)
                                        }
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
                                        Ville{" "}
                                        <span className="required">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Ville au Maroc"
                                        onChange={(e) =>
                                          setVille(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="checkout-form-list">
                                      <label>
                                        Code Postal{" "}
                                        <span className="required">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        defaultValue={code_postal}
                                        placeholder="Code Postal en ville"
                                        onChange={(e) =>
                                          setCodePostal(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              {index === 2 && <AdForm />}
                              {index === 3 && (
                                <>
                                  <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">
                                      Type De Paiement
                                    </FormLabel>
                                    <RadioGroup
                                      aria-labelledby="demo-radio-buttons-group-label"
                                      defaultValue="COD"
                                      value={paymentType}
                                      onChange={handlePaymentTypeChange}
                                      name="radio-buttons-group"
                                    >
                                      <FormControlLabel
                                        value="COD"
                                        control={<Radio />}
                                        label="Payer comptant à la livraison"
                                      />
                                      <FormControlLabel
                                        value="Paid-Online"
                                        control={<Radio />}
                                        label="Payer En Ligne"
                                      />
                                    </RadioGroup>
                                  </FormControl>
                                  {customerInfo?.balance !== 0 &&
                                    Object.keys(customerInfo).length !== 0 && (
                                      <div>
                                        <FormLabel id="demo-checkbox-group-label-coins">
                                          Un choix si vous voulez aussi payer
                                          par votre Coins
                                        </FormLabel>

                                        <FormGroup>
                                          <FormControlLabel
                                            control={
                                              <Checkbox
                                                checked={checkCoins === "COINS"}
                                                onChange={(e) => {
                                                  setShowInputCoins(
                                                    e.target.checked
                                                  );
                                                  setCheckCoins(
                                                    e.target.checked
                                                      ? "COINS"
                                                      : ""
                                                  );
                                                }}
                                                name="checkbox-coins"
                                              />
                                            }
                                            label="Payer ainsi par votre coins"
                                          />
                                        </FormGroup>

                                        {showInputCoins && (
                                          <div>
                                            <h4>
                                              {customerInfo?.balance} COINS ={" "}
                                              {customerInfo?.balance / 10} Dh
                                              available
                                            </h4>
                                            <div className="checkout-form-list">
                                              <label htmlFor="coins">
                                                Payer Par Votre Balance Coins:{" "}
                                                <span className="required">
                                                  *
                                                </span>
                                              </label>
                                              <input
                                                type="number"
                                                id="coins"
                                                placeholder="Coins"
                                                value={coinsUsed}
                                                max={usableCoins}
                                                onChange={(e) =>
                                                  handleCoinsChange(e)
                                                }
                                              />
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                </>
                              )}
                              <Box sx={{ mb: 2 }}>
                                <div>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      if (index === steps.length - 1) {
                                        // Submit the form programmatically
                                        handleSubmit();
                                      } else {
                                        handleNext();
                                      }
                                    }}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    {index === steps.length - 1
                                      ? "Commander"
                                      : "Continue"}
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
                    <h3>Votre Commande</h3>
                    <div className="your-order-table table-responsive">
                      <div className="table-content table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="product-thumbnail">Images</th>
                              <th className="cart-product-name">Produit</th>
                              <th className="cart-product-name">Pointure</th>
                              <th className="product-price">Prix</th>
                              <th className="ml-30">Retirer</th>
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
                            <th className="product-name">Produit</th>
                            <th className="product-total">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="cart_item">
                            <td className="product-name">Prix Original </td>
                            <td className="product-total">
                              <span className="amount">
                                {" "}
                                {total_original.toFixed(2)}.00 Dh
                              </span>
                            </td>
                          </tr>
                          <tr className="cart_item">
                            <td className="product-name">Vous Souvegardez</td>
                            <td className="product-total">
                              <span className="amount">
                                {" "}
                                - {total_porcentage.toFixed(2)} Dh
                              </span>
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
                            <th>Shipping(Service Charge)</th>
                            <td>
                              <span className="amount">
                                {total.toFixed(2) < 1000 ? "50" : "0"} Dh
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Commande Total</th>
                            <td>
                              <strong>
                                <span className="amount">
                                  {total.toFixed(2)} Dh
                                </span>
                              </strong>
                            </td>
                          </tr>
                          {customerInfo?.balance !== 0 &&
                            Object.keys(customerInfo).length !== 0 && (
                              <>
                                <tr className="order-total">
                                  <th> Vous gagnez</th>
                                  <td>
                                    <strong>
                                      <span className="amount">
                                        <img
                                          width="20"
                                          height="20"
                                          src="/assets/img/logo/coins.png"
                                          className="mr-10"
                                          alt="icon-coins"
                                        />
                                        Coins + {total / 2.5}
                                      </span>
                                    </strong>
                                  </td>
                                </tr>
                                <tr className="order-total">
                                  <th>
                                    Max de coins que vous pouvez utiliser :
                                  </th>
                                  <td>
                                    <span className="amount">
                                      <img
                                        width="20"
                                        height="20"
                                        src="/assets/img/logo/coins.png"
                                        className="mr-10"
                                        alt="icon-coins"
                                      />{" "}
                                      Coins + {usableCoins}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="order-total">
                                  <th>Coins a Vous Payez :</th>
                                  <td>
                                    <strong>
                                      <span className="amount">
                                        <img
                                          width="20"
                                          height="20"
                                          src="/assets/img/logo/coins.png"
                                          className="mr-10"
                                          alt="icon-coins"
                                        />{" "}
                                        Coins + {coinsUsed} Coins
                                      </span>
                                    </strong>
                                  </td>
                                </tr>
                                <tr className="order-total">
                                  <th>Vous Souvegardez par coins:</th>
                                  <td>
                                    <strong>
                                      <span className="amount">
                                        - {coinsUsed / 10} Dh
                                      </span>
                                    </strong>
                                  </td>
                                </tr>
                                <tr className="order-total">
                                  <th>Total Payer:</th>
                                  <td>
                                    <strong>
                                      <span className="amount">
                                        {(total - coinsUsed / 10).toFixed(2)} Dh{" "}
                                      </span>
                                    </strong>
                                  </td>
                                </tr>
                              </>
                            )}
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </Fragment>
  );
}
