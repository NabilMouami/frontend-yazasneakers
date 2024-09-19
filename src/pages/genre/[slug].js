// pages/categories/[category].js

"use client";
import Head from "next/head";
import { config_url } from "@/util/config";

import { useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import FilterData from "@/components/shop/FilterData";
import { Fragment, useState } from "react";
import Preloader from "@/components/elements/Preloader";
import Image from "next/image";

function GenreProduct({ initialData }) {
  console.log(initialData);

  const pathname = window.location.pathname;
  const category = pathname.split("/")[2]; // Extracts category from the URL path
  console.log("Current Category:", category);

  return (
    <Fragment>
      <Head>
        <title>{`Achetez des produits | Chez Yazasneakers`}</title>
        <meta
          name="description"
          content={`Découvrez notre large sélection de produit. Achetez maintenant pour les meilleures offres sur.`}
        />
        <meta property="og:title" content={`Achetez des produits`} />
        <meta
          property="og:description"
          content={`Découvrez les produits et obtenez les meilleures offres.`}
        />
        <meta property="og:image" content="https://your-image-url.com" />
        <meta
          property="og:url"
          content={`https://your-site.com/produit/category`}
        />
      </Head>

      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Genre">
        {" "}
        <div className="pt-40">
          <h3 className="text-center fw-bolder fs-4 text-uppercase">
            Genre Snikears {category}{" "}
          </h3>
          <div className="product-area pt-30 pb-20">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="row row-cols-xxl-6 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                    <FilterData
                      showItem={20}
                      style={1}
                      //showPagination
                      filterData={initialData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}
// getServerSideProps to fetch data from the Express API
export async function getServerSideProps(context) {
  const { slug } = context.params; // Extract category from route params

  try {
    // Fetch data from your Express.js API
    const res = await fetch(`${config_url}/api/interface/genre/${slug}`);
    const data = await res.json();

    // If the category is not found, return 404
    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialData: data, // Pass the fetched data as props
      },
    };
  } catch (error) {
    return {
      props: {
        initialData: [],
        error: error.message, // Handle any error
      },
    };
  }
}
export default GenreProduct;
