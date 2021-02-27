import React, { useEffect, useState, Fragment } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/products";
import Product from "./products/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {categories} from "../constants/common";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

function Home({ match }) {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("0");


  const [price, setPrice] = useState([1, 100000]);

  const keyword = match.params.keyword;
  const alert = useAlert();
  const {
    loading,
    products,
    productsCount,
    resPerPage,
    error,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  useEffect(
    () => {
      if (error) {
        return alert.error(error);
      }
      dispatch(getAllProducts(keyword, currentPage, price, category, rating));
    },
    [dispatch, alert, keyword, error, currentPage, price, category,rating],
    
  );

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Buy the best products here" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{ 1: `$1`, 100000: `100000` }}
                        min={1}
                        max={100000}
                        def={[1, 100000]}
                        tipFormatter={(value) => `${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5-">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="list-group">
                          {categories.map((category) => (
                            <li
                              key={category}
                              className="cursor-pointer"
                              style={{
                                listStyle: "none",
                                cursor: "pointer",
                                color: "gray",
                              }}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* rating filter */}
                      <hr className="my-5" />
                      <div className="mt-5-">
                        <h4 className="mb-3">Ratings</h4>
                        <ul className="list-group">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              key={star}
                              className="cursor-pointer"
                              style={{
                                listStyle: "none",
                                cursor: "pointer",
                              }}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{ width: `${star * 20}%` }}
                                />
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
            </div>
            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={count}
                  onChange={setCurrentPageNumber}
                  nextPageText={"next"}
                  prevPageText={"previous"}
                  firstPageText={"first"}
                  lastPageText={"last"}
                  itemClass={"page-item"}
                  linkClass={"page-link"}
                />
              </div>
            )}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
