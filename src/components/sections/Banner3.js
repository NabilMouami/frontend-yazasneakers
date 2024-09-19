"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";

import React, { useState, useEffect } from "react";
import { config_url } from "@/util/config";
import { useDispatch } from "react-redux";
import { loadAllCategories } from "@/features/categorySlice";
import WhiteProduct from "./WhiteProduct";
import LatestArrival from "./LatestArrival";
export default function Banner3() {
  const { categoryList } = useSelector((state) => state.Categories) || {};
  const [hover, setHover] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  console.log(allCategories);

  useEffect(() => {
    axios.get(`${config_url}/api/categories`).then(async (res) => {
      await setAllCategories(res.data);
    });
  }, []);
  return (
    <>
      <Link href={`/produits/${allCategories[0]?.name}`}>
        <div className="bannerContainer1">
          <img
            src={`${config_url}/categories/${allCategories[0]?.image}`}
            alt={allCategories[0]?.meta_image}
          />
        </div>
      </Link>

      <section className="banner-area pt-15">
        <div className="bannerborder">
          <div className="container-fluid">
            {/* <div className="row gx-3">
              <div className="col-4">
                <div className="banneritem banner-animation mb-15 p-relative">
                  <div className="image-container">
                    <img
                      src={`${config_url}/categories/${allCategories[1]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[1]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[1]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[1]?.name}`}>
                      <button className="text-button btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[1]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>
                </div>
                <div className="banneritem banner-animation mb-15 p-relative">
                  <div className="image-container">
                    <img
                      src={`${config_url}/categories/${allCategories[2]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <div className="bannertext d-flex justify-content-center align-items-center">
                      <Link href={`/collections/${allCategories[2]?.name}`}>
                        <button className="text-button btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                          {allCategories[2]?.name}{" "}
                        </button>
                      </Link>{" "}
                      <Link href={`/collections/${allCategories[2]?.name}`}>
                        <button className="text-button btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                          {allCategories[2]?.name}{" "}
                        </button>
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div className="banneritem p-relative">
                  <div className="image-container">
                    <img
                      src={`${config_url}/categories/${allCategories[3]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[3]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[3]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[3]?.name}`}>
                      <button className="text-button btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[3]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div> */}

            <div className="grid-container-ban">
              <div className="grid-item jackets">
                <img
                  src={`${config_url}/categories/${allCategories[1]?.image}`}
                  alt="Jackets"
                />

                <div className="overlay">
                  <Link href={`/collections/${allCategories[1]?.name}`}>
                    {allCategories[1]?.name}{" "}
                  </Link>{" "}
                </div>
              </div>
              <div className="row gy-2">
                <div className="grid-item newsletter">
                  <img
                    src={`${config_url}/categories/${allCategories[2]?.image}`}
                    alt="Newsletter"
                  />
                  <div className="overlay">
                    <Link href={`/collections/${allCategories[2]?.name}`}>
                      {allCategories[2]?.name}{" "}
                    </Link>{" "}
                  </div>
                </div>
                <div className="grid-item stanley">
                  <img
                    src={`${config_url}/categories/${allCategories[3]?.image}`}
                    alt="Stanley"
                  />
                  <div className="overlay">
                    <Link href={`/collections/${allCategories[3]?.name}`}>
                      {allCategories[3]?.name}{" "}
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
            <WhiteProduct />

            <LatestArrival />
          </div>
        </div>
        <div className="bannerborder">
          <div className="container-fluid">
            <button
              className="w-100 mb-20 p-3 fw-bolder border border-dark border-1 fs-4 text-uppercase btn-lg"
              style={{
                backgroundColor: hover ? "#00712D" : "white",
                transition: "background-color 0.3s ease",
                color: hover ? "white" : "black",
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Tous les nouveaux modèles
            </button>
            <div className="row gx-4">
              <div className="col-lg-4 col-md-6 col-6">
                <div className="banneritem p-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[4]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[4]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[4]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[4]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[4]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-6">
                <div className="banneritem p-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[5]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[5]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[5]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[5]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[5]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>{" "}
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-12">
                <div className="banneritem position-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[6]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[6]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[6]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[6]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[6]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bannerborder">
          <div className="container-fluid">
            <button
              className="w-100 mt-20 mb-20 p-3 fw-bolder border border-dark border-1 fs-4 text-uppercase btn-lg"
              style={{
                backgroundColor: "#000",
                color: "white",
              }}
            >
              Family Business Since 2008
            </button>

            <div className="row gx-2">
              <div className="col-lg-3 col-md-12 col-6">
                <div className="banneritem p-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[7]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[7]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[7]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[7]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[7]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-6">
                <div className="banneritem p-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[8]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[8]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[8]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[8]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[8]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>{" "}
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-6">
                <div className="banneritem position-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[9]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[9]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[9]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[9]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[9]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>{" "}
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-6">
                <div className="banneritem position-relative">
                  <div className="bannerContainer2 image-container">
                    <Image
                      height={500}
                      width={500}
                      src={`${config_url}/categories/${allCategories[10]?.image}`}
                      className="zoom-image"
                      alt=""
                    />
                  </div>
                  <div className="bannertext d-flex justify-content-center align-items-center">
                    <Link href={`/collections/${allCategories[10]?.name}`}>
                      <button className="text-button btn btn-lg  fw-bolder border border-dark fs-6 text-uppercase bg-dark text-white d-lg-block d-none">
                        {allCategories[10]?.name}{" "}
                      </button>
                    </Link>{" "}
                    <Link href={`/collections/${allCategories[10]?.name}`}>
                      <button className="text-button1 btn btn-md pl-3 pr-3 border border-dark text-uppercase bg-dark text-white text-center d-lg-none d-block">
                        {allCategories[10]?.name}{" "}
                      </button>
                    </Link>{" "}
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
