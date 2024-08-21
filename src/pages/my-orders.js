"use client";
import dynamic from "next/dynamic";
import { config_url } from "@/util/config";
import axios from "axios";
import Image from "next/image";
import { Fragment, useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout/Layout";
const CartItems = dynamic(() => import("@/components/elements/CartItems"), {
  loading: () => <p>Loading...</p>,
});
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Checkout() {
  const { customerInfo } = useSelector((state) => state.Customer) || {};
  const [listOrdersCustomer, setListOrdersCustomer] = useState([]);
  const [listOrders, setListOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${config_url}/api/customers/orders/${customerInfo?.id}`)
      .then((res) => {
        console.log("API Response:", res.data);

        // Ensure proper data structure
        if (res.data && res.data.data) {
          setListOrdersCustomer(res.data.data.data);
          setListOrders(res.data.data.data || []); // Update this based on actual structure
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);
  const totalSumPrice = listOrders.reduce((accumulator, order) => {
    return accumulator + order.total_price_sum;
  }, 0);
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
                <form>
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Image</th>
                          <th className="cart-product-name">Produit Nom</th>
                          <th className="cart-product-name">Size</th>
                          <th className="product-price">Prix ​​unitaire</th>
                          <th className="product-price">Date Order</th>
                          <th className="product-remove">Delivery Status</th>
                          <th className="product-remove">Coins Payed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listOrders?.map((data, index) => {
                          return (
                            <tr className="cart-item" key={index}>
                              <td className="product-thumbnail">
                                <Image
                                  src={`${config_url}/images/${data.product_image}`}
                                  alt="cart added product"
                                  width={80}
                                  height={80}
                                />
                              </td>

                              <td className="product-name">
                                {data.product_name}
                              </td>
                              <td className="product-name">
                                <button
                                  className="btn btn-sm btn-dark text-white"
                                  style={{
                                    borderRadius: "25px",
                                    padding: "0.25rem 0.75rem",
                                  }} // Smaller padding
                                >
                                  {data.size}
                                </button>
                              </td>

                              <td className="product-price">
                                {data.total_price_sum} Dh
                              </td>

                              <td className="product-price">
                                {data.date_order}
                              </td>
                              <td className="product-remove">
                                {data.delivery_status}
                              </td>
                              <td className="product-remove">
                                {data.coins_payed}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="row justify-content-end">
                    <div className="col-md-5 ">
                      <div className="cart-page-total">
                        <h2>Order total Informations</h2>
                        <ul className="mb-20">
                          <li>
                            Total Price Ordered <span>{totalSumPrice} Dh</span>
                          </li>
                          <li>
                            Total Coins:{" "}
                            <span>{listOrders[0]?.balance} Coins.</span>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
}
