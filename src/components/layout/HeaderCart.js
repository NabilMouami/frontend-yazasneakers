"use client";

import { addQty, deleteCart } from "@/features/shopSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { config_url } from "@/util/config";
import { Fragment, useMemo } from "react";

export default function HeaderCart({ isCartSidebar, handleCartSidebar }) {
  const { cart } = useSelector((state) => state.shop) || {};

  const dispatch = useDispatch();

  // delete cart item
  const deleteCartHandler = (id) => {
    dispatch(deleteCart(id));
  };

  // qty handler
  const total = useMemo(() => {
    let sum = 0;

    cart?.forEach((data) => {
      const price =
        data.item.price_promo !== 0 ? data.item.price_promo : data.item.price;
      sum += price;
    });
    return sum;
  }, [cart]);

  return (
    <Fragment>
      <div
        className={`tpcartinfo tp-cart-info-area p-relative ${
          isCartSidebar ? "tp-sidebar-opened" : ""
        }`}
      >
        <button className="tpcart__close" onClick={handleCartSidebar}>
          <i className="fal fa-times" />
        </button>
        <div className="tpcart">
          <h4 className="tpcart__title">Votre Panier</h4>
          <div className="tpcart__product">
            <div className="tpcart__product-list">
              <ul>
                {cart?.map((data, i) => (
                  <li key={i}>
                    <div className="tpcart__item">
                      <div className="tpcart__img">
                        <img
                          src={`${config_url}/images/${data.item.image}`}
                          alt=""
                        />
                        <div
                          className="tpcart__del"
                          onClick={() => deleteCartHandler(data.item?.id)}
                        >
                          <button>
                            <i className="far fa-times-circle" />
                          </button>
                        </div>
                      </div>
                      <div className="tpcart__content">
                        <span className="tpcart__content-title">
                          <Link href="/shop-details">{data.item.name}</Link>
                        </span>
                        <div className="tpcart__cart-price">
                          <span className="new-price">
                            {data.item.price_promo !== 0
                              ? data.item.price_promo
                              : data.item.price}{" "}
                            Dh
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tpcart__checkout">
              <div className="tpcart__total-price d-flex justify-content-between align-items-center">
                <span> Subtotal:</span>
                <span className="heilight-price">{total.toFixed(2)} Dh</span>
              </div>
              <div className="tpcart__checkout-btn">
                <Link className="tpcart-btn mb-10" href="/cart">
                  View Cart
                </Link>
                <Link className="tpcheck-btn" href="/checkout">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
          <div className="tpcart__free-shipping text-center">
            <span>
              Livraison gratuite pour les commandes <b>supérieures à 1000Dh</b>
            </span>
          </div>
        </div>
      </div>
      <div
        className={`cartbody-overlay ${isCartSidebar ? "opened" : ""}`}
        onClick={handleCartSidebar}
      />
    </Fragment>
  );
}
