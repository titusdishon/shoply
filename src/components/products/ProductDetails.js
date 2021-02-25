import React, {Fragment, useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import {getProductDetails, newReview} from "../../actions/products";
import {addItemToCart} from "../../actions/cart";
import {Link} from "react-router-dom";
import {NEW_REVIEW_RESET} from "../../constants/productConstants";
import ListReviews from "../review/listReview";

function ProductDetails({match}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {error: reviewError, success} = useSelector(state => state.newReview);
    const alert = useAlert();
    const {loading, product, error} = useSelector(
        (state) => state.productDetails
    );
    useEffect(() => {
        if (error) {
            return alert.error(reviewError);
        }
        if (success) {
            alert.success("Review posted successfully");
            dispatch({
                type: NEW_REVIEW_RESET
            })
        }
        dispatch(getProductDetails(match.params.id));
    }, [dispatch, alert, reviewError, match.params.id, success,error]);

    const increaseQty = (e) => {
        e.preventDefault();
        const count = document.querySelector('.count')
        if (count.valueAsNumber >= product.stock) return;
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = (e) => {
        e.preventDefault();
        const count = document.querySelector('.count')
        if (count.valueAsNumber <= 1) return;
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    }
    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success("Item successfully added to cart")
    }

    function setUserRatings(e) {
        const stars = document.querySelectorAll(".star");
        stars.forEach((star, index) => {
            star.starValue = index + 1;
            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showStarRatings)
            })
        })

        function showStarRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');
                        setRating(this.starValue);
                    } else {
                        star.classList.remove('orange');
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow');
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('yellow');
                }
            })
        }
    }

    const submitHandler = () => {
        const formData = new FormData();
        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', match.params.id);
        dispatch(newReview(formData));
    }
    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title={product && product.name}/>
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel params="hover">
                                {product.images &&
                                product.images.map((image) => (
                                    <Carousel.Item key={image.public_id}>
                                        <img
                                            className="d-block w-100"
                                            src={image.url}
                                            alt={product.title}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className="col-12 col-lg-5 mt-5">
                            <h3 className="mt-2 text-success font-weight-bold">
                                {product && product.name}
                            </h3>
                            <p id="product_id" className="mt-2 font-italic">
                                Product #{product._id}
                            </p>
                            <hr/>
                            <div className="rating-outer">
                                <div
                                    className="rating-inner"
                                    style={{width: `${(product.ratings / 5) * 100}%`}}
                                />
                            </div>
                            <span id="no_of_reviews">({product.reviews&&product.reviews.length} Reviews)</span>
                            <hr/>
                            <p id="product_price">{product && product.currency}:{' '}{product && product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input
                                    type="number"
                                    className="form-control count d-inline"
                                    value={quantity}
                                    readOnly
                                />
                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button
                                type="button"
                                id="cart_btn"
                                disabled={!product.stock > 0}
                                className="btn btn-primary d-inline ml-4"
                                onClick={addToCart}
                            >
                                Add to Cart
                            </button>

                            <hr/>

                            <p>
                                Status:{" "}
                                <span
                                    className={product.stock > 0 ? "text-success" : "text-danger"}
                                    id="stock_status"
                                >
                              {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                            </span>
                            </p>

                            <hr/>

                            <h4 className="mt-2 text-success font-weight-bold">
                                Description:
                            </h4>
                            <p>{product && product.description}</p>
                            <hr/>
                            <p id="product_seller mb-3">
                                Sold by: <strong>{product && product.seller}</strong>
                            </p>

                            {user ?
                                <button id="review_btn" type="button" className="btn btn-primary mt-4"
                                        data-toggle="modal" data-target="#ratingModal"
                                        onClick={setUserRatings}>
                                    Submit Your Review
                                </button> : (
                                    <Link to={"/login"}>
                                        <div className="alert alert-danger mt-5"> Login to submit a review</div>
                                    </Link>
                                )}

                            <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">
                                                Submit Review
                                            </h5>
                                        </div>
                                        <div className="modal-body">
                                            <div className="modal-body">
                                                <ul className="stars">
                                                    <li className="star">
                                                        <i className="fa fa-star"/>
                                                    </li>
                                                    <li className="star">
                                                        <i className="fa fa-star"/>
                                                    </li>
                                                    <li className="star">
                                                        <i className="fa fa-star"/>
                                                    </li>
                                                    <li className="star">
                                                        <i className="fa fa-star"/>
                                                    </li>
                                                    <li className="star">
                                                        <i className="fa fa-star"/>
                                                    </li>
                                                </ul>

                                                <textarea
                                                    name="review"
                                                    id="review"
                                                    onChange={(e) => setComment(e.target.value)}
                                                    className="form-control mt-3"
                                                />

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                className="btn my-3 float-right review-btn px-4 text-white"
                                                data-dismiss="modal"
                                                aria-label="Close"
                                                disabled={comment === ''}
                                                onClick={submitHandler}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {product&&product.reviews&&product.reviews.length>0&&(
                        <ListReviews reviews={product.reviews}/>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}

export default ProductDetails