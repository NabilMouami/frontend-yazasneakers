"use client";
import Link from "next/link";
import Image from "next/image";
import { config_url } from "@/util/config";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 5,
  spaceBetween: 30,
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
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 1,
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: ".tpproductarrow__nxt",
    prevEl: ".tpproductarrow__prv",
  },
};

export default function WhiteProduct() {
  const { productList } = useSelector((state) => state.Products) || {};

  return (
    <>
      <section className="white-product-area grey-bg-2 pt-65 pb-70 fix p-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 col-12">
              <div className="tpsection mb-40">
                <h4 className="tpsection__title">Dernières arrivées</h4>
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="tpproductarrow d-flex align-items-center">
                <div className="tpproductarrow__prv">
                  <i className="far fa-long-arrow-left" />
                  Prev
                </div>
                <div className="tpproductarrow__nxt">
                  Next
                  <i className="far fa-long-arrow-right" />
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-container product-active">
            <Swiper {...swiperOptions}>
              {productList?.slice(1, 9).map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="whiteproduct">
                    <div className="whiteproduct__thumb">
                      <Link href={`/produits/${item.name_by_filtered}`}>
                        <Image
                          src={`${config_url}/images/${item.image}`}
                          alt="product-thumb"
                          layout="responsive"
                          width={300}
                          height={300}
                        />
                      </Link>
                    </div>
                    <div className="whiteproduct__contentd-flex d-flex flex-column align-items-center justify-content-center">
                      <div className="whiteproduct__text">
                        <h5 className="whiteproduct__title">
                          <Link href={`/shop-details/${item.id}`}>
                            {item.name}
                          </Link>
                        </h5>
                        <div className="tpproduct__priceinfo p-relative w-100 d-flex flex-column align-items-center justify-content-center gap-2">
                          {item.price_promo === 0 ? (
                            ""
                          ) : (
                            <div className="tpproduct__ammount">
                              <span>{item.price_promo}.00 Dh</span>
                            </div>
                          )}
                          {item.price_promo === 0 ? (
                            <span className="fs-6">{item.price}Dh</span>
                          ) : (
                            <del className="dernierarrive-price-promo ml-4">
                              {item.price}.00 Dh
                            </del>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="banner-shape">
          <img
            src="/assets/img/banner/product-shape-01.png"
            alt="shape"
            className="banner-shape-primary"
          />
          <img
            src="/assets/img/banner/product-shape-02.png"
            alt="shape"
            className="banner-shape-secondary"
          />
        </div>
      </section>
    </>
  );
}
