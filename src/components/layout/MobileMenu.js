"use client";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

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
                <a>Categories</a>
                <ul
                  className="submenu"
                  style={{ display: `${isActive.key == 1 ? "block" : "none"}` }}
                >
                  {categoryList?.map((item) => (
                    <li key={item.id}>
                      <Link href={`/collections/${item.name}`}>
                        <span className="submenu-items">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <a
                  className="mean-expand"
                  onClick={() => handleClick(1)}
                  style={{ fontSize: 18 }}
                >
                  <i
                    className={`fal fa-${
                      isActive.key === 1 ? "minus" : "plus"
                    }`}
                  />
                </a>
              </li>
              <li className="has-dropdown">
                <a>Genres</a>
                <ul
                  className="submenu"
                  style={{ display: `${isActive.key == 2 ? "block" : "none"}` }}
                >
                  <li>
                    <Link href="/genre/homme">
                      <span className="submenu-items">Hommes</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/genre/femme">
                      <span className="submenu-items">Femmes</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/genre/enfant">
                      <span className="submenu-items">Enfants</span>
                    </Link>
                  </li>
                </ul>
                <a
                  className="mean-expand"
                  onClick={() => handleClick(2)}
                  style={{ fontSize: 18 }}
                >
                  <i
                    className={`fal fa-${
                      isActive.key === 2 ? "minus" : "plus"
                    }`}
                  />
                </a>
              </li>
              <li>
                <Link href="/on-sale">Sales</Link>
              </li>
              <li>
                <Link href="/new">New Arrival</Link>
              </li>

              <li className="mean-last">
                <Link href="/collections/sneakers">Sneakers</Link>
              </li>

              <li className="mean-last">
                <Link href="/collections/accessoire">Accessoires</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
