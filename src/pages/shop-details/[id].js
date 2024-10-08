"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addCartWithSize } from "@/features/shopSlice";
import { addWishlistWithSize } from "@/features/wishlistSlice";
import Layout from "@/components/layout/Layout";

import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "react-image-gallery/styles/css/image-gallery.css";
const ReactImageGallery = dynamic(() => import("react-image-gallery"), {
  ssr: false,
});
const Zoom = dynamic(() => import("react-medium-image-zoom"), { ssr: false });
import "react-medium-image-zoom/dist/styles.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { config_url } from "@/util/config";
import { loadDetailsProduct } from "@/features/productsSlice";
import Image from "next/image";
const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 5,
  spaceBetween: 25,
  autoplay: {
    delay: 3500,
  },
  breakpoints: {
    1400: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 5,
    },
    992: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
  navigation: {
    nextEl: ".tprelated__nxt",
    prevEl: ".tprelated__prv",
  },
};
export default function ShopDetails() {
  const { productList } = useSelector((state) => state.Products) || {};
  const { Details } = useSelector((state) => state.Products) || {};
  const [productSimilaire, setProductSimilaire] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectsize, setSelected] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [listProdsGroup, setListProdsGroup] = useState([]);
  console.log(listProdsGroup);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");
  console.log(category);
  const dispatch = useDispatch();
  const abc = useParams();

  useEffect(() => {
    console.log("useParams:", abc);
    const id = abc.id;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config_url}/api/interface/products/${parseInt(id)}`
        );
        console.log("API Response:", response.data);

        const productData = response?.data[0];
        console.log("Product Data:", productData);

        setProduct(productData);
        dispatch(loadDetailsProduct(productData)); // Dispatch the action
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [abc, dispatch]);

  useEffect(() => {
    if (product.id) {
      console.log("Fetching product group for product id:", product.id);
      axios
        .get(`${config_url}/api/product_group/${product.id}`)
        .then((res) => {
          console.log("Product Group Data:", res.data);
          setListProdsGroup(res.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product group:", error);
        });
    }
  }, [product]);

  useEffect(() => {
    console.log("Details changed:", Details);
    if (Details?.category) {
      console.log("Setting category:", Details.category);
      setCategory(Details.category); // Update category when Details.category changes
    }
  }, [Details]);
  useEffect(() => {
    if (category && productList?.length > 0) {
      const filtered = productList.filter(
        (product) => product.category === category
      );
      setProductSimilaire(filtered);
    }
  }, [category, productList]);
  const handleSelectedSize = (size) => {
    setSelectedSize(size);
    setSelected(false);
  };
  const addToCart = (id, size) => {
    if (Details?.nemuro_shoes) {
      try {
        const myArray = JSON.parse(Details.nemuro_shoes);
        let size_final = size === null ? myArray[0] : size;
        const item = productList?.find((item) => item.id === id);
        const itemwithsize = { item, size: size_final };
        console.log(itemwithsize);
        dispatch(addCartWithSize({ product: itemwithsize }));
      } catch (error) {
        console.error("Failed to parse nemuro_shoes JSON:", error);
      }
    } else {
      console.error("Details.nemuro_shoes is undefined or null");
    }
  };

  const addToWishlist = (id, size) => {
    if (Details?.nemuro_shoes) {
      try {
        const myArray = JSON.parse(Details.nemuro_shoes);
        let size_final = size === null ? myArray[0] : size;
        const item = productList?.find((item) => item.id === id);
        const itemwithsize = { item, size: size_final };
        dispatch(addWishlistWithSize({ product: itemwithsize }));
      } catch (error) {
        console.error("Failed to parse nemuro_shoes JSON:", error);
      }
    } else {
      console.error("Details.nemuro_shoes is undefined or null");
    }
  };

  if (!Details) {
    return <div>Product not found</div>;
  }

  let myArray = [];
  if (Details?.nemuro_shoes) {
    try {
      myArray = JSON.parse(Details.nemuro_shoes);
    } catch (error) {
      console.error("Failed to parse nemuro_shoes JSON:", error);
    }
  }

  const imagesArray = Details?.images ? JSON.parse(Details.images) : [];
  const validImages = [Details?.image, ...imagesArray].filter((image) => image);

  const productDetailItem = {
    images: validImages.map((image) => ({
      original: `${config_url}/images/${image}`,
      thumbnail: `${config_url}/images/${image}`,
    })),
  };

  const renderImage = useCallback(
    (item) => (
      <Zoom>
        <Image
          width={500}
          height={500}
          src={item.original}
          alt={item.description}
        />
      </Zoom>
    ),
    []
  );

  const renderButtons = useCallback(
    (sizes) =>
      sizes.map((number, index) => (
        <button
          key={number}
          onClick={() => handleSelectedSize(number)}
          className={`btn btn-sm ${
            selectedSize === number || (selectedSize === null && index === 0)
              ? "btn-dark text-white"
              : "btn-outline-secondary"
          }`}
          style={{ borderRadius: "25px", padding: "0.25rem 0.75rem" }}
        >
          {number}
        </button>
      )),
    [handleSelectedSize, selectedSize]
  );

  return (
    <>
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Shop Details">
        <div>
          <section className="product-area pt-80 pb-25">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-12">
                  <div className="tpproduct-details__nab pr-50 mb-40">
                    <ReactImageGallery
                      showFullscreenButton={false}
                      showPlayButton={false}
                      renderItem={renderImage}
                      autoPlay={false}
                      lazyLoad={true}
                      items={productDetailItem.images}
                    />
                  </div>
                </div>
                <div className="col-lg-5 col-md-7">
                  <div className="tpproduct-details__content">
                    <div className="tpproduct-details__title-area d-flex align-items-center flex-wrap mb-5">
                      <h3 className="tpproduct-details__title">
                        {Details.name}
                      </h3>
                      <span className="tpproduct-details__stock">
                        {Details.status ? (
                          Details.status
                        ) : (
                          <span className="text-success">In Stock</span>
                        )}
                      </span>
                    </div>
                    <div
                      className="mb-2 p-2 d-flex flex-column gap-2 me-2"
                      style={{ width: "90%" }}
                    >
                      <div className="small font-weight-bold">Tailles</div>
                      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-4 g-2">
                        {renderButtons(myArray)}
                      </div>
                    </div>
                    <div className="tpproduct-details__price mb-30 d-flex gap-2 justify-center">
                      {Details.price_promo === 0 ? (
                        ""
                      ) : (
                        <span>{Details.price_promo}Dh</span>
                      )}
                      {Details.price_promo === 0 ? (
                        <span>{Details.price}Dh</span>
                      ) : (
                        <del className="ml-4">{Details.price}Dh</del>
                      )}
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start gap-4">
                      <div>
                        {Details.price_promo === 0 ? (
                          <span>
                            <i className="fa fa-coins text-success"></i> Coins +{" "}
                            {Details.price / 2.5} Coins
                          </span>
                        ) : (
                          <span>
                            <i className="fa fa-coins text-success"></i> Coins +{" "}
                            {Details.price_promo / 2.5} Coins
                          </span>
                        )}
                      </div>
                      <div className="tpproduct-details__count d-flex flex-column justify-content-center align-items-start gap-4 mb-25">
                        <div className="tpproduct-details__cart ml-10">
                          <button
                            onClick={() => addToCart(Details.id, selectedSize)}
                          >
                            <i className="fal fa-shopping-cart" /> Add To Cart
                          </button>
                        </div>
                        <Link href="/checkout">
                          <button
                            className="ml-10 footer-widget__fw-news-btn tpsecondary-btn"
                            onClick={() => addToCart(Details.id, selectedSize)}
                          >
                            Demander maintenant
                            <i className="fal fa-long-arrow-right" />
                          </button>
                        </Link>
                        <div className="tpproduct-details__wishlist">
                          <i
                            className="fal fa-heart"
                            onClick={() =>
                              addToWishlist(Details.id, selectedSize)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="tpproduct-details__information tpproduct-details__categories">
                      <p>Categories:</p>
                      <span>{Details.category_names}</span>
                    </div>
                    <div className="tpproduct-details__information tpproduct-details__tags">
                      <p>Tags:</p>
                      <span>{Details.genre}</span>
                    </div>
                    {listProdsGroup && listProdsGroup.length > 0 && (
                      <h3>Related Product:</h3>
                    )}

                    <div className="w-100 d-flex gap-2">
                      {listProdsGroup?.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <div
                            className={`border w-50 ${
                              selectedProduct === product.id
                                ? "border-dark"
                                : "border-0"
                            } rounded p-4`}
                            onClick={() =>
                              dispatch(loadDetailsProduct(product))
                            }
                          >
                            <Image
                              width={50}
                              height={50}
                              src={`${config_url}/images/${product.image}`}
                              alt={product.meta_image}
                              className="rounded"
                              layout="responsive"
                              objectFit="cover" // or "cover" based on your preference
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-md-5">
                  <div className="tpproduct-details__condation">
                    <ul>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <Image
                              width={30}
                              height={30}
                              src="/assets/img/icon/product-det-1.png"
                              alt="services-1"
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              Free Shipping apply to all
                              <br />
                              orders over 500 Dh
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <Image
                              width={30}
                              height={30}
                              src="/assets/img/icon/product-det-2.png"
                              alt="services-2"
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              Guranteed 100% Organic
                              <br />
                              from natural farmas
                            </p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="tpproduct-details__condation-item d-flex align-items-center">
                          <div className="tpproduct-details__condation-thumb">
                            <Image
                              width={30}
                              height={30}
                              src="/assets/img/icon/product-det-3.png"
                              alt="services-3"
                              className="tpproduct-details__img-hover"
                            />
                          </div>
                          <div className="tpproduct-details__condation-text">
                            <p>
                              1 Day Returns if you change
                              <br />
                              your mind
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* product-details-area-end */}
          {/* related-product-area-start */}
          <div className="related-product-area pt-65 pb-50 related-product-border">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-sm-6">
                  <div className="tpsection mb-40">
                    <h4 className="tpsection__title">Related Products</h4>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="tprelated__arrow d-flex align-items-center justify-content-end mb-40">
                    <div className="tprelated__prv">
                      <i className="far fa-long-arrow-left" />
                    </div>
                    <div className="tprelated__nxt">
                      <i className="far fa-long-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-container related-product-active">
                <Swiper {...swiperOptions}>
                  {productSimilaire?.map((item) => {
                    const images = JSON.parse(item.images); // Parse the images string into an array
                    const firstImage = images[0];
                    const secondImage = images[1];

                    return (
                      <SwiperSlide key={item.id}>
                        <div className="tpproduct pb-15 mb-30">
                          <div className="tpproduct__thumb p-relative">
                            <Link href={`/shop-details/${item.id}`}>
                              <Image
                                width={300}
                                height={300}
                                src={`${config_url}/images/${firstImage}`}
                                alt="product-thumb"
                              />
                              <Image
                                width={300}
                                height={300}
                                className="product-thumb-secondary"
                                src={`${config_url}/images/${secondImage}`}
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
                              <Link href={`/shop-details/${item.id}`}>
                                <i className="fal fa-eye" />
                              </Link>
                              <a
                                onClick={() =>
                                  addToWishlist(item.id, selectedSize)
                                }
                                className="wishlist"
                              >
                                <i className="fal fa-heart" />
                              </a>
                            </div>

                            <div className="tpproduct__content">
                              <h3 className="tpproduct__title">
                                <Link href={`/shop-details/${item.id}`}>
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
                                    <del className="ml-10">
                                      {item.price}.00Dh
                                    </del>
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
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
