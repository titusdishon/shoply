import React, { useEffect, Fragment } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/products";
import Product from "./products/Product";
import Loader from "./layouts/Loader";
import { useAlert } from "react-alert";

function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (error) {
     return  alert.error(error);
    }
    dispatch(getAllProducts());
  }, [dispatch, alert, error]);

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
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
