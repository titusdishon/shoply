import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors, getOrderDetails, updateOrder} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {UPDATE_ORDER_RESET} from "../../constants/orderConstants";

function ProcessOrder({match, history}) {
    const [orderStatus, setStatus] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch()

    const {loading, order = {}} = useSelector(state => state.order);
    const {shippingInfo, paymentInfo, user, totalPrice} = order;
    const {error, isUpdated} = useSelector(state => state.orderUpdate);
    const orderId = match.params.id;
    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success('Order updated successfully');
            dispatch({type: UPDATE_ORDER_RESET});
        }
    }, [dispatch, error, alert, isUpdated, orderId, history]);

    const updateOrderHandler = (e, id) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("orderStatus", orderStatus);
        dispatch(updateOrder(id, formData));
    };
    const shippingAddressDetails = order && order.shippingInfo && `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.postalCode},${order.shippingInfo.country}`
    const isPaid = order && order.paymentInfo && order.paymentInfo.status === 'succeeded'
    return (
        <Fragment>
            <MetaData title={`Process order #${order && order._id}`}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        {loading ? <Loader/> :

                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">

                                    <h2 className="my-5">Order # {order && order._id}</h2>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name:</b> {user && user.name}</p>
                                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingAddressDetails}</p>
                                    <p><b>Amount:</b> {totalPrice}</p>

                                    <hr/>

                                    <h4 className="my-4">Payment</h4>
                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={isPaid ? 'greenColor' : 'redColor'}>
                                        <b>{isPaid ? 'PAID' : 'NOT PAID'}</b>
                                    </p>

                                    <h4 className="my-4">Stripe Id:</h4>
                                    <p><b>{paymentInfo && paymentInfo.id}</b>
                                    </p>

                                    <h4 className="my-4">Status</h4>
                                    <p className={order && order.orderStatus && String(order.orderStatus).includes('Delivered') ? 'greenColor' : 'redColor'}>
                                        <b>{order && order.orderStatus && order.orderStatus}</b></p>
                                    <h4 className="my-4">Order Items:</h4>
                                    <hr/>
                                    <div className="cart-item my-1">
                                        {order && order.orderItems && order.orderItems.map(item => (
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
                                    <hr/>
                                </div>

                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            name='status'
                                            value={orderStatus}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary btn-block"
                                            onClick={(e) => updateOrderHandler(e, order && order._id)}>
                                        Update Status
                                    </button>
                                </div>

                            </div>
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder;