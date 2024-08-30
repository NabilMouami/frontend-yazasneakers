"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { config_url } from "@/util/config";
export default function Banner3() {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  return (
    <>
      <div
        className="p-5 text-center bg-image rounded-3 position-relative d-flex justify-content-center align-items-center"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/R.75efcbe35315edc90df1c1927aae0003?rik=6T2bjd5o8hBm8A&pid=ImgRaw&r=0')", // Use the uploaded image
          height: "100vh", // Full viewport height
          width: "100vw", // Full viewport width
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // Ensures the image covers the entire div
          backgroundPosition: "center", // Centers the image
          position: "relative", // For positioning overlay
          overflow: "hidden", // Prevents overflow
        }}
      >
        {/* Overlay for better text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            zIndex: 1, // Ensures the overlay is behind text
          }}
        ></div>

        {/* Content goes here */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            color: "#fff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          }}
        >
          <button className="btn btn-dark">Shop Now</button>
        </div>
      </div>

      <section className="banner-area pt-15">
        <div className="bannerborder">
          <div className="container-fluid">
            <div className="row gx-3">
              <div className="col-lg-8 col-md-12">
                <div className="banneritem banneroverlay p-relative">
                  <Image
                    height={700}
                    width={500}
                    src={`${config_url}/categories/${categoryList[0]?.image}`}
                    className="w-100"
                    alt=""
                  />
                  <div className="bannertext text-center">
                    <h4 className="bannertext__title mb-40">
                      <Link href={`/produit/${categoryList[0]?.name}`}>
                        {" "}
                        {categoryList[0]?.name}
                      </Link>
                    </h4>
                    <div className="bannertext__btn tpexclusive__btn">
                      <Link
                        href={`/produit/${categoryList[0]?.name}`}
                        className="tp-btn  banner-animation"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="banneritem banner-animation mb-15 p-relative">
                  <Image
                    height={300}
                    width={1000}
                    src={`${config_url}/categories/${categoryList[1]?.image}`}
                    className="w-100"
                    alt=""
                  />
                  <div className="bannerbox">
                    <span className="bannerbox__subtitle banner-bottom-bg mb-130">
                      <Link href={`/produit/${categoryList[1]?.name}`}>
                        {categoryList[1]?.name}
                      </Link>
                    </span>
                    <div className="bannerbox__btn">
                      <Link
                        className="tp-btn banner-animation mr-25"
                        href={`/produit/${categoryList[1]?.name}`}
                      >
                        Shop Now
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="banneritem banner-animation p-relative">
                  <Image
                    height={300}
                    width={1000}
                    src={`${config_url}/categories/${categoryList[2]?.image}`}
                    className="w-100"
                    alt=""
                  />
                  <div className="bannerbox">
                    <span className="bannerbox__subtitle banner-bottom-bg mb-130">
                      <Link href={`/produit/${categoryList[2]?.name}`}>
                        {categoryList[2]?.name}
                      </Link>
                    </span>
                    <div className="bannerbox__btn">
                      <Link
                        className="tp-btn banner-animation mr-25"
                        href="/shop-2"
                      >
                        Shop Now
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
