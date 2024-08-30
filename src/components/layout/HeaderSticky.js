"use client";

import Link from "next/link";
import Image from "next/image";
import CartShow from "../elements/CartShow";
import WishListShow from "../elements/WishListShow";
import { useSelector } from "react-redux";
export default function HeaderSticky({
  scroll,
  isCartSidebar,
  handleCartSidebar,
}) {
  const { customerInfo } = useSelector((state) => state.Customer) || {};

  return (
    <>
      <div
        id="header-sticky"
        className={`logo-area tp-sticky-one mainmenu-5 ${
          scroll ? "header-sticky" : ""
        }`}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-3">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/assets/img/logo/logo.webp"
                    alt="yazasneakers"
                    height={100}
                    width={100}
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li className="ml-30">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="ml-30">
                      <Link href="/shop">Shop</Link>
                    </li>
                    <li className="ml-30">
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li className="ml-30">
                      <Link href="/blog">Blog</Link>
                    </li>
                    <li className="ml-30">
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li className="ml-30">
                      <Link href="/on-sale">Sale</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="header-meta-info d-flex align-items-center justify-content-end">
                <div className="header-meta__social  d-flex align-items-center">
                  <button
                    className="header-cart p-relative tp-cart-toggle"
                    onClick={handleCartSidebar}
                  >
                    <i className="fal fa-shopping-cart" />
                    <CartShow />
                  </button>
                  <Link href="/sign-in">
                    <i className="fal fa-user" />
                  </Link>
                  <Link
                    href="/wishlist"
                    className="header-cart p-relative tp-cart-toggle"
                  >
                    <i className="fal fa-heart" />
                    <WishListShow />
                  </Link>
                </div>
                {Object.keys(customerInfo).length !== 0 && (
                  <div className="header-meta__search-5 ml-25">
                    <div className="header-meta__lang">
                      <ul className="font-small">
                        <li>
                          <a>
                            <i className="fal fa-user" />
                            {customerInfo.firstName} {customerInfo.lastName}
                            <span>
                              <i className="fal fa-angle-down" />
                            </span>
                          </a>
                          <ul className="header-meta__lang-submenu">
                            <li>
                              <i className="fa fa-sign-out-alt text-success"></i>
                              Logout
                            </li>
                            <li>
                              {" "}
                              <i className="fa fa-coins text-success"></i>{" "}
                              {customerInfo?.balance} Coins
                            </li>
                            <li>
                              <i className="fa fa-receipt text-success"></i>

                              <Link href="/my-orders"> My-Orders</Link>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
