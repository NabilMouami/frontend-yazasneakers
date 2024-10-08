"use client";
import axios from "axios";

import { Fragment, useState, useEffect } from "react";
import { config_url } from "@/util/config";
import Preloader from "@/components/elements/Preloader";
import FilterDataLatestArrival from "../shop/FilterDataLatestArrival";
export default function LatestArrival() {
  const [data, setData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${config_url}/api/products/release`)
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
      <div className="pt-40">
        <h3 className="text-center fw-bolder fs-4 text-uppercase">
          Dernières arrivées de produits:
        </h3>
        <div className="product-area pt-30 pb-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="row row-cols-xxl-6 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-2">
                  <FilterDataLatestArrival
                    status="new"
                    showItem={4}
                    style={1}
                    //showPagination
                    filterData={filteredJobs}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
