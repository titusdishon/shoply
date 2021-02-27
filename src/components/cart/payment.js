import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";
import CheckoutSteps from "./checkoutSteps";
import axios from "axios";
import {clearErrors, createOrder} from "../../actions/order";
import {RESET_CART_CART} from "../../constants/cart";

const options = {
    style: {
        base: {
            fontSize: '16px '
        },
        inValid: {
            color: 'red'
        }
    }
}

function Payment({history}) {
    const {shippingInfo, cartItems} = useSelector(state => state.cart);
    const {user} = useSelector(state => state.auth);
    const {error} = useSelector(state => state.newOrder);
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

    const order = {
        orderItems: cartItems,
        shippingInfo,

    }
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
             order.itemsPrice = orderInfo.itemsPrice;
            order.taxPrice = orderInfo.taxPrice;
            order.shippingPrice = orderInfo.shippingPrice;
            order.totalPrice = orderInfo.totalPrice;
    }
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        let res;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process', paymentData, config);
            const clientSecret = res.data.client_secret;
            if (!stripe || !elements) {
                return;
            }
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            });
            if (result.error) {
                alert.error(result.error.message);
                document.querySelector('#pay_btn').disabled = false;
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order));
                    dispatch({type:RESET_CART_CART})
                    history.push('/success');
                } else {
                    alert.error('There was an issue processing your payment')
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message);
        }
    }

    return (
        <Fragment>
            <MetaData title={"payment"}/>
            <CheckoutSteps shipping confirmOrder payment/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay{`${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Payment