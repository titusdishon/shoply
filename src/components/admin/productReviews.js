import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors} from "../../actions/order";
import Loader from "../layouts/Loader";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import moment from "moment";
import {deleteReview, getProductReviews} from "../../actions/products";
import {DELETE_REVIEW_RESET} from "../../constants/productConstants";

function ProductReviews({history}) {
    const [productId, setProductId] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, reviews} = useSelector(state => state.productReviews);
    const {isDeleted} = useSelector(state => state.review)
    useEffect(() => {
        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }
        if (isDeleted) {
            alert.success("Review deleted successfully");
            dispatch({type: DELETE_REVIEW_RESET})
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, error, productId, alert, isDeleted]);

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Review Id',
                    field: 'id',
                    sort: 'asc'
                }, {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                }, {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                }, {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                }, {
                    label: 'Date Posted',
                    field: 'createdAt',
                    sort: 'asc'
                }, {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        reviews && reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.user,
                createdAt: moment(review.createdAt).format('MM/DD/YY, h:mm a'),
                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={()=>deleteReviewHandler(review._id)}>
                        <i className={'fa fa-trash'}/>
                    </button>,
            })
        })
        return data;
    }

    //delete an review
    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id,productId))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId));
    }
    return (
        <Fragment>
            <MetaData title={"Product Reviews"}/>
            {loading ? <Loader/> :
                <div className="row">
                    <div className="col-12 col-md-2">
                        <SideBar/>
                    </div>
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <h1 className="my-5">Product Reviews</h1>
                            <div className="row justify-content-center mt-5">
                                <div className="col-5">
                                    <form onSubmit={submitHandler}>
                                        <div className="form-group">
                                            <label htmlFor="productId_field">Enter Product ID</label>
                                            <input
                                                type="text"
                                                id="email_field"
                                                className="form-control"
                                                value={productId}
                                                onChange={(e) => setProductId(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            id="search_button"
                                            type="submit"
                                            className="btn btn-primary btn-block py-2"
                                        >
                                            SEARCH
                                        </button>
                                    </ form>
                                </div>

                            </div>
                            {reviews && reviews.length > 0 ? (
                                <MDBDataTable
                                    data={setReviews()}
                                    className={'px-3'}
                                    bordered
                                    striped
                                    hover
                                />
                            ) : (
                                <p className="mt-5 text-center">
                                    No reviews
                                </p>
                            )}

                        </Fragment>
                    </div>
                </div>}
        </Fragment>
    )
}


export default ProductReviews