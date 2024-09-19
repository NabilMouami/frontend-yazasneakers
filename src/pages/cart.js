"use client";
import CartItems from "@/components/elements/CartItems";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { Fragment } from "react";
import { useSelector } from "react-redux";
export default function Cart() {
  const { cart } = useSelector((state) => state.shop) || {};
  console.log(cart);
  let total = 0;
  cart?.forEach((data) => {
    const price =
      data.item.price_promo !== 0 ? data.item.price_promo : data.item.price;
    total += price;
  });
  return (
    <Fragment>
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Cart">
        <section
          className="cart-area pt-80 pb-80 wow fadeInUp"
          data-wow-duration=".8s"
          data-wow-delay=".2s"
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="table-content table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="cart-product-name">Produit Nom</th>
                        <th className="cart-product-name">Pointure</th>
                        <th className="product-price">Prix ​​unitaire</th>
                        <th className="product-remove">Retirer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <CartItems />
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="coupon-all">
                      <div className="coupon">
                        <input
                          id="coupon_code"
                          className="input-text"
                          name="coupon_code"
                          placeholder="Coupon code"
                          type="text"
                        />
                        <button
                          className="tp-btn tp-color-btn banner-animation"
                          name="apply_coupon"
                          type="submit"
                        >
                          Apply Coupon
                        </button>
                      </div>
                      <div className="coupon2">
                        <button
                          className="tp-btn tp-color-btn banner-animation"
                          name="update_cart"
                          type="submit"
                        >
                          Update cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-md-5 ">
                    <div className="cart-page-total">
                      <h2>Cart totals</h2>
                      <ul className="mb-20">
                        <li>
                          Subtotal <span>{total.toFixed(2)} Dh</span>
                        </li>
                        <li>
                          Total <span>{total.toFixed(2)} Dh</span>
                        </li>
                      </ul>
                      <Link
                        href="/checkout"
                        className="tp-btn tp-color-btn banner-animation"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
}
