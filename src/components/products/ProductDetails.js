import React, { useState, Fragment, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/products";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import {Carousel } from "react-bootstrap";

function ProductDetails({ match }) {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="product details" />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
             <Carousel params="hover">
                 {product.images&&product.images.map(image =>(
                     <Carousel.Item key={image.public_id}>
                         <img className="d-block w-100" src={image.url} alert={product.title}/>
                     </Carousel.Item>
                 ))}
             </Carousel>
            </div>
            <div className="col-12 col-lg-5 mt-5">
              <h3 className="mt-2 text-success font-weight-bold">{product && product.name}</h3>
              <p id="product_id" className="mt-2 font-italic">Product #{product._id}</p>
              <hr />
              <div className="rating-outer">
                <div className="rating-inner"  style={{ width: `${(product.reatings / 5) * 100}%` }}></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              <hr />

              <p id="product_price">{product&&product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus">-</span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value="1"
                  readOnly
                />

                <span className="btn btn-primary plus">+</span>
              </div>
              <button
                type="button"
                id="cart_btn"
                disabled={!product.stock>0}
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status: <span className={product.stock>0?'text-success':'text-danger'} id="stock_status">{product.stock>0?'In Stock':'Out Of Stock'}</span>
              </p>

              <hr />

              <h4 className="mt-2 text-success font-weight-bold">Description:</h4>
              <p>{product && product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product && product.seller}</strong>
              </p>

              <button
                id="review_btn"
                type="button"
                onClick={() => setOpenModal(true)}
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button>

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <Modal
                    className="modal fade"
                    show={openModal}
                    onHide={() => setOpenModal(false)}
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Submit Review
                        </h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setOpenModal(false)}
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                        ></textarea>

                        <button
                          className="btn my-3 float-right review-btn px-4 text-white"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
