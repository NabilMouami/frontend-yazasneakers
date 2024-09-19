"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { config_url } from "@/util/config";
import { addCartWithSize } from "@/features/shopSlice";
import { addWishlistWithSize } from "@/features/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";

const ShopCardOnSale = ({ item }) => {
  const { productList } = useSelector((state) => state.Products) || {};

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectsize, setSelected] = useState(true);

  console.log(item);
  const dispatch = useDispatch();

  const myArray = JSON.parse(item.nemuro_shoes);

  const imagesArray = JSON.parse(item.images) || [];
  const validImages = [item.image, ...imagesArray].filter((image) => image);

  const images = {
    img1: `${config_url}/images/${validImages[0]}`,
    img2: `${config_url}/images/${validImages[1] || ""}`,
    img3: `${config_url}/images/${validImages[2] || ""}`,
    img4: `${config_url}/images/${validImages[3] || ""}`,
  };
  const handleSelectedSize = (size) => {
    setSelectedSize(size);
    setSelected(false);
  };

  const createButton = (number, index) => (
    <button
      key={number}
      onClick={() => handleSelectedSize(number)}
      className={`btn btn-sm ${
        selectedSize === number || (selectedSize === null && index === 0)
          ? "btn-dark text-white"
          : "btn-outline-secondary"
      }`}
      style={{
        borderRadius: "25px",
        padding: "0.25rem 0.3rem",
        fontSize: "0.7rem",
      }}
    >
      {number}
    </button>
  );

  const addToCart = (id, size) => {
    const myArray = JSON.parse(item.nemuro_shoes);

    let size_final = size === null ? myArray[0] : size;
    const item_fil = productList?.find((item) => item.id === id);
    const itemwithsize = { item: item_fil, size: size_final };
    console.log(itemwithsize);
    dispatch(addCartWithSize({ product: itemwithsize }));
  };
  const addToWishlist = (id, size) => {
    const myArray = JSON.parse(item.nemuro_shoes);

    let size_final = size === null ? myArray[0] : size;
    const item_fil = productList?.find((item) => item.id === id);
    const itemwithsize = { item: item_fil, size: size_final };
    dispatch(addWishlistWithSize({ product: itemwithsize }));
  };

  const renderButtons = (sizes) => {
    return sizes.map((number, index) => createButton(number, index));
  };

  const percentage = ((item?.price - item?.price_promo) / item?.price) * 100;

  return (
    <>
      <div className="col">
        <div className="tpproduct pb-15 mb-30">
          <div className="tpproduct__thumb p-relative">
            <span className="tpproduct__thumb-volt">
              {percentage.toFixed(0)}%
            </span>

            <Link href={`/produits/${item.name_by_filtered}`}>
              <Image
                width={300}
                height={300}
                src={images.img1}
                alt="product-thumb"
              />
              <Image
                width={300}
                height={300}
                className="product-thumb-secondary"
                src={images.img3}
                alt="product-thumb-secondary"
                layout="responsive"
                objectFit="contain" // or "cover" based on your preference
              />
            </Link>
            <div className="tpproduct__thumb-action">
              <a
                onClick={() => addToCart(item.id, selectedSize)}
                className="add-to-cart"
              >
                <i className="fal fa-shopping-basket" />
              </a>
              <Link href={`/produits/${item.name_by_filtered}`}>
                <i className="fal fa-eye" />
              </Link>
              <a
                onClick={() => addToWishlist(item.id, selectedSize)}
                className="wishlist"
              >
                <i className="fal fa-heart" />
              </a>
            </div>
          </div>

          <div className="tpproduct__content">
            <h3 className="tpproduct__title">
              <Link href={`/produits/${item.name_by_filtered}`}>
                {item.name}
              </Link>
            </h3>
            <div className="tpproduct__priceinfo p-relative">
              <div className="tpproduct__priceinfo-list">
                {item.price_promo === 0 ? (
                  ""
                ) : (
                  <span>{item.price_promo}.00Dh</span>
                )}
                {item.price_promo === 0 ? (
                  <span>{item.price}Dh</span>
                ) : (
                  <del className="ml-10">{item.price}.00Dh</del>
                )}
              </div>

              <div className="mb-2 p-2 d-flex flex-column gap-2 me-2">
                <div className="row row-cols-4 row-cols-md-4 row-cols-lg-4 g-2">
                  {renderButtons(myArray)}
                </div>
              </div>

              <div
                className="tpproduct__cart"
                onClick={() => addToCart(item.id)}
              >
                <i className="fal fa-shopping-cart" />
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCardOnSale;
