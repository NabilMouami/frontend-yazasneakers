"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { config_url } from "@/util/config";
import { addCartWithSize } from "@/features/shopSlice";
import { addWishlistWithSize } from "@/features/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";

const ShopCardLatestArrival = ({ status, item }) => {
  return (
    <>
      <div className="col">
        <div className="tpproduct pb-15 mb-30">
          <div className="tpproduct__thumb p-relative">
            <span className="tpproduct__thumb-release">{status}</span>

            <Link href={`/produits/${item.name_by_filtered}`}>
              <div class="image-container">
                <Image
                  height={500}
                  width={500}
                  src={`${config_url}/images/${item?.image}`}
                  className="w-100 img-fluid zoom-image"
                  alt=""
                />
              </div>
            </Link>
          </div>
          <div className="tpproduct__content">
            <h3 className="tpproduct__title">
              <Link href={`/produits/${item.name_by_filtered}`}>
                {item.name}
              </Link>
            </h3>

            <div className="tpproduct__priceinfo p-relative">
              <div>
                {item.price_promo === 0 ? (
                  ""
                ) : (
                  <span className="fw-bold">{item.price_promo}.00Dh</span>
                )}
                {item.price_promo === 0 ? (
                  <span>{item.price}Dh</span>
                ) : (
                  <del className="ml-10">{item.price}.00Dh</del>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCardLatestArrival;
