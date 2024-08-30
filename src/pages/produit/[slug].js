"use client";
import { useSelector } from "react-redux";

import Layout from "@/components/layout/Layout";
import FilterData from "@/components/shop/FilterData";
import FilterSidebar from "@/components/shop/FilterSidebar";
import { Fragment, useState, useEffect } from "react";
import Preloader from "@/components/elements/Preloader";

function CategoriesProduct() {
  const pathname = window.location.pathname; // Example: "/product/3"
  const category = pathname.split("/")[2]; // Extracts "3" from the pathname
  console.log("Current Product ID:", category);

  const { productList } = useSelector((state) => state.Products) || {};
  const [data, setData] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productList.length > 0 && category) {
      const filtered = productList.filter(
        (item) => item.category_names === category
      );
      setFilteredJobs(filtered);
      setData(filtered);

      setLoading(false);
    } else {
      setFilteredJobs(productList);
      setData(productList);
      setLoading(false);
    }
  }, [productList, category]);

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
      console.log("Genre:", filters.genre);

      filtered = filtered.filter((product) =>
        filters.genre.includes(product.genre)
      );
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

export default CategoriesProduct;
