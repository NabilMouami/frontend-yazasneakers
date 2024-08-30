"use client";
import axios from "axios";

import Layout from "@/components/layout/Layout";
import FilterData from "@/components/shop/FilterData";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { Fragment, useState, useEffect } from "react";
import { config_url } from "@/util/config";
import Preloader from "@/components/elements/Preloader";

export default function Shop2() {
  const [data, setData] = useState([]);
  console.log(data);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${config_url}/api/products`)
      .then((res) => {
        setData(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  const handleFilterChange = (filters) => {
    let filtered = [...data];

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => {
        const productSizes = JSON.parse(product.nemuro_shoes);
        return filters.sizes.some((size) => productSizes.includes(size));
      });
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category_names)
      );
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
      <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Shop">
        <div className="product-area pt-70 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-md-12">
                <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                  <FilterData
                    showItem={5}
                    style={1}
                    showPagination
                    filterData={filteredJobs}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-12">
                <div className="tpsidebar product-sidebar__product-category">
                  <FilterSidebar onFilterChange={handleFilterChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
}
