"use client";
import CartShow from "@/components/elements/CartShow";
import WishListShow from "@/components/elements/WishListShow";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { config_url } from "@/util/config";
import { useState } from "react";
import HeaderMobSticky from "../HeaderMobSticky";
import HeaderSticky from "../HeaderSticky";
import HeaderTabSticky from "../HeaderTabSticky";

export default function Header3({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  isCartSidebar,
  handleCartSidebar,
}) {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  const [isToggled, setToggled] = useState(false);
  const handleToggle = () => setToggled(!isToggled);
  return (
    <>
      <header>
        <div className="header-top tertiary-header-top space-bg">
          <div className="container">
            <div className="row">
              <div className="col-xl-7 col-lg-12 col-md-12 ">
                <div className="header-welcome-text">
                  <span>
                    Welcome to our international shop! Enjoy free shipping on
                    orders.
                  </span>
                  <Link href="/shop">
                    Shop Now
                    <i className="fal fa-long-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-5 d-none d-xl-block">
                <div className="headertoplag d-flex align-items-center justify-content-end">
                  <div className="headertoplag__lang">
                    <ul>
                      <li>
                        <Link href="/sign-in">
                          <i className="fal fa-user" /> Account
                        </Link>
                        <Link className="order-tick" href="/tracking">
                          <i className="fal fa-plane-departure" />
                          Track Your Order
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="menu-top-social">
                    <Link href="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link href="#">
                      <i className="fab fa-instagram" />
                    </Link>
                    <Link href="#">
                      <i className="fab fa-tiktok" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="logo-area green-logo-area mt-30 d-none d-xl-block">
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
              <div className="col-xl-10 col-lg-9">
                <div className="header-meta-info d-flex align-items-center justify-content-between">
                  <div className="header-search-bar">
                    <form action="#">
                      <div className="search-info p-relative">
                        <button className="header-search-icon">
                          <i className="fal fa-search" />
                        </button>
                        <input type="text" placeholder="Search products..." />
                      </div>
                    </form>
                  </div>
                  <div className="header-meta header-brand d-flex align-items-center">
                    <div className="header-meta__social d-flex align-items-center ml-25">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-menu-area tertiary-main-menu mt-25 d-none d-xl-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-3">
                <div className="cat-menu__category p-relative">
                  <span onClick={handleToggle}>
                    <i className="fal fa-bars" />
                    Categories
                  </span>
                  <div
                    className="category-menu"
                    style={{ display: `${isToggled ? "block" : "none"}` }}
                  >
                    <ul className="cat-menu__list">
                      {categoryList?.map((item) => (
                        <li key={item.id}>
                          <Link href={`/produit/${item.name}`}>
                            <Image
                              src={`${config_url}/categories/${item.image}`}
                              alt={item.meta_image}
                              width={40}
                              height={40}
                              className="rounded-circle mr-4"
                            />
                            <span>{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li className="">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="ml-40">
                        <Link href="/shop">Shop</Link>
                      </li>
                      <li className="ml-40">
                        <Link href="/cart">Cart</Link>
                      </li>
                      <li className="ml-40">
                        <Link href="/blog">Blog</Link>
                      </li>
                      <li className="ml-40">
                        <Link href="/contact">Contact</Link>
                      </li>
                      <li className="ml-35">
                        <Link href="/on-sale">Sale</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2">
                <div className="menu-contact">
                  <ul>
                    <li>
                      <div className="menu-contact__item">
                        <div className="menu-contact__icon">
                          <i className="fal fa-phone" />
                        </div>
                        <div className="menu-contact__info">
                          <Link href="/tel:0123456">+212 626 30 9597</Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <HeaderSticky
        scroll={scroll}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />
      <HeaderTabSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />
      <HeaderMobSticky
        scroll={scroll}
        isMobileMenu={isMobileMenu}
        handleMobileMenu={handleMobileMenu}
        isCartSidebar={isCartSidebar}
        handleCartSidebar={handleCartSidebar}
      />
    </>
  );
}
