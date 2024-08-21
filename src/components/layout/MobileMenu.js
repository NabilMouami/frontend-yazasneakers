"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { config_url } from "@/util/config";

export default function MobileMenu() {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

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
  return (
    <>
      <div className="mobile-menu mean-container">
        <div className="mean-bar">
          <Link href="#" className="meanmenu-reveal">
            <span>
              <span>
                <span />
              </span>
            </span>
          </Link>
          <nav className="mean-nav">
            <ul>
              <li className="has-dropdown">
                <Link href="/">Home</Link>
                <ul
                  className="submenu"
                  style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}
                >
                  <li>
                    <Link href="/">Wooden Home</Link>
                  </li>
                  <li>
                    <Link href="/index-2">Fashion Home</Link>
                  </li>
                  <li>
                    <Link href="/index-3">Furniture Home</Link>
                  </li>
                  <li>
                    <Link href="/index-4">Cosmetics Home</Link>
                  </li>
                  <li>
                    <Link href="/index-5">Food Grocery</Link>
                  </li>
                </ul>
                <Link
                  className="mean-expand"
                  onClick={() => handleClick(1)}
                  href="#"
                  style={{ fontSize: 18 }}
                >
                  <i className="fal fa-plus" />
                </Link>
              </li>
              <li className="has-dropdown">
                <Link href="/shop">Categories</Link>
                <ul
                  className="submenu"
                  style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}
                >
                  {categoryList?.map((item) => (
                    <li key={item.id}>
                      <Link href={`/produit/${item.name}`}>
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="mean-expand"
                  onClick={() => handleClick(2)}
                  href="#"
                  style={{ fontSize: 18 }}
                >
                  <i className="fal fa-plus" />
                </Link>
              </li>
              <li>
                <Link href="/sale">Sales</Link>
              </li>
              <li className="has-dropdown">
                <Link href="/blog">Blog</Link>
                <ul
                  className="submenu"
                  style={{ display: `${isActive.key == 4 ? "block" : "none"}` }}
                >
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link href="/blog-details">Blog Details</Link>
                  </li>
                </ul>
                <Link
                  className="mean-expand"
                  onClick={() => handleClick(4)}
                  href="#"
                  style={{ fontSize: 18 }}
                >
                  <i className="fal fa-plus" />
                </Link>
              </li>
              <li className="mean-last">
                <Link href="/shop">Shop</Link>
              </li>

              <li className="mean-last">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
