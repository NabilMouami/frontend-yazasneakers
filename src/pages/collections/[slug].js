// pages/categories/[category].js

"use client";
import Head from "next/head";
import { config_url } from "@/util/config";

import { useSelector } from "react-redux";
import Layout from "@/components/layout/Layout";
import FilterData from "@/components/shop/FilterData";
import FilterSidebar from "@/components/shop/FilterSidebar";

import { Fragment, useState } from "react";
import Preloader from "@/components/elements/Preloader";
import Image from "next/image";
// Component
function CategoriesProduct({ initialData }) {
  console.log(initialData);
  const pathname = window.location.pathname;
  const category = pathname.split("/")[2]; // Extracts category from the URL path
  console.log("Current Category:", category);

  const [data, setData] = useState(initialData || []); // Set initialData from SSR
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false); // Initial data already loaded from SSR
  const [error, setError] = useState(null);

  const handleFilterChange = (filters) => {
    let filtered = [...data];
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => {
        const productSizes = JSON.parse(product.nemuro_shoes);

        // Extract size numbers from filters.sizes (ignoring counts in parentheses)
        const selectedSizes = filters.sizes.map((size) => size.split(" ")[0]);

        return selectedSizes.some((size) => productSizes.includes(size));
      });
    }

    if (filters.category.length > 0) {
      console.log("Category Filters:", filters.category);

      filtered = filtered.filter((product) => {
        // Normalize genres by converting to lowercase
        const productGenres = product.category_names
          .toLowerCase()
          .split(",")
          .map((g) => g.trim());
        const filterGenres = filters.category.map((g) => g.toLowerCase());

        // Check if any of the product genres match the filter genres
        const matches = productGenres.some((genre) =>
          filterGenres.includes(genre)
        );
        console.log(
          `Checking product ${product.id} with genres ${productGenres}: ${matches}`
        );
        return matches;
      });

      console.log("After Genre Filter:", filtered);
    }
    if (filters.genre.length > 0) {
      console.log("Genre Filters:", filters.genre);

      filtered = filtered.filter((product) => {
        // Normalize genres by converting to lowercase
        const productGenres = product.genre
          .toLowerCase()
          .split(",")
          .map((g) => g.trim());
        const filterGenres = filters.genre.map((g) => g.toLowerCase());

        // Check if any of the product genres match the filter genres
        const matches = productGenres.some((genre) =>
          filterGenres.includes(genre)
        );
        console.log(
          `Checking product ${product.id} with genres ${productGenres}: ${matches}`
        );
        return matches;
      });

      console.log("After Genre Filter:", filtered);
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.price[0] && product.price <= filters.price[1]
    );
    console.log("After Price Filter:", filtered);

    setFilteredJobs(filtered);
  };

  if (loading) return <Preloader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Fragment>
      <Head>
        <title>{`Shop ${category} Products | At Yazasneaker Store`}</title>
        <meta
          name="description"
          content={`Browse our wide selection of ${category} products. Shop now for the best deals on ${category}.`}
        />
        <meta property="og:title" content={`Shop ${category} Products`} />
        <meta
          property="og:description"
          content={`Browse ${category} products and get the best deals.`}
        />
        <meta property="og:image" content="https://your-image-url.com" />
        <meta
          property="og:url"
          content={`https://your-site.com/collections/${category}`}
        />
      </Head>
      <Layout headerStyle={3} footerStyle={1}>
        <div className="meta-description-category">
          <div className="row">
            <div className="col-md-6 col-12 brand-description-meta">
              <div>
                <h1>{category}</h1>
                <p className="text-white">{initialData[0]?.meta_description}</p>
              </div>
            </div>
            <div className="col-md-6 col-12 brand-image-category">
              <img
                src={initialData[0]?.category_image}
                alt={initialData[0]?.meta_image}
              />
            </div>
          </div>
        </div>
        <div className="product-area pt-70 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-12">
                <div className="tpsidebar product-sidebar__product-category">
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    data={initialData}
                  />
                </div>
              </div>

              <div className="col-lg-10 col-md-12">
                <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                  <FilterData
                    showItem={20}
                    style={1}
                    showPagination
                    filterData={filteredJobs}
                  />
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
    const res = await fetch(`${config_url}/api/interface/category/${slug}`);
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

export default CategoriesProduct;
