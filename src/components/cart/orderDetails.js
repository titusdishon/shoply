import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors, getOrderDetails} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";

function OrderDetails({match}) {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, order} = useSelector(state => state.order);
    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert,match.params.id]);
    const shippingAddressDetails =order&& order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.postalCode},${order.shippingInfo.country}`
    const isPaid = order&&order.paymentInfo && order.paymentInfo.status === 'succeeded'
    return (
        <Fragment>
            <MetaData title={"Order details"}/>
            {loading ? <Loader/> : (
                <Fragment>
                    <div className="container container-fluid">
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8 m-auto bg-light order-details">
                                <h1 className="my-5 ">Order # {order && order._id}</h1>
                                <hr className="p-0 m-0 bg-dark"/>
                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {order && order.user.name}</p>
                                <p><b>Phone:</b>{order && order.shippingInfo.phoneNumber} </p>
                                <p className="mb-4"><b>Address:</b>{shippingAddressDetails}</p>
                                <p><b>Amount:</b> {order && order.totalPrice}</p>
                                <hr className="p-0 m-0 bg-dark"/>
                                <h4 className="my-4">Payment</h4>
                                <h4 className="my-4">Order Status:</h4>
                                <p className={isPaid ? 'greenColor' : 'redColor'}><b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                                </p>
                                <h4 className="my-4">Status</h4>
                                <p className={order&&order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'}>
                                    <b>{order&&order.orderStatus && order.orderStatus}</b></p>
                                <h4 className="my-4">Order Items:</h4>
                                <hr className="p-0 m-0 bg-dark"/>
                                <div className="cart-item my-1">
                                    {order && order.orderItems.map(item => (
                                        <div className="row my-5" key={item.product}>
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65"/>
                                            </div>
                                            <div className="col-5 col-lg-5">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>{item.price}</p>
                                            </div>
                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr className="p-0 m-0 bg-dark"/>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}


export default OrderDetails