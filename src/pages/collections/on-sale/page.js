"use client";
import axios from "axios";

import Layout from "@/components/layout/Layout";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config_url } from "@/util/config";
import Preloader from "@/components/elements/Preloader";
import FilterDataOnSale from "@/components/shop/FilterDataOnSale";

export default function OnSale() {
  const { categoryList } = useSelector((state) => state.Categories) || {};

  const [data, setData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${config_url}/api/products/promotion`)
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
    console.log("Initial Data:", filtered);

    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => {
        const productSizes = JSON.parse(product.nemuro_shoes);
        return filters.sizes.some((size) => productSizes.includes(size));
      });
      console.log("After Size Filter:", filtered);
    }
    console.log("Filters:", filters.category);

    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category_names)
      );
      console.log("After Category Filter:", filtered);
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
                  <FilterDataOnSale filterData={filteredJobs} />
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
