import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors, getAdminOrders} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import moment from "moment";

function AdminOrders() {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, orders} = useSelector(state => state.adminOrders);
    useEffect(() => {
        dispatch(getAdminOrders())
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                }, {
                    label: 'Order Items',
                    field: 'orderItems',
                    sort: 'asc'
                }, {
                    label: 'Items Price',
                    field: 'itemsPrice',
                    sort: 'asc'
                }, {
                    label: 'Shipping Price',
                    field: 'shippingPrice',
                    sort: 'asc'
                }, {
                    label: 'Tax Price',
                    field: 'taxPrice',
                    sort: 'asc'
                }
                , {
                    label: 'Total Price',
                    field: 'totalPrice',
                    sort: 'asc'
                }, {
                    label: 'Paid At ',
                    field: 'paidAt',
                    sort: 'asc'
                }, {
                    label: 'Delivered At ',
                    field: 'deliveredAt',
                    sort: 'asc'
                }, {
                    label: 'Shipping Info ',
                    field: 'shippingInfo',
                    sort: 'asc'
                }
                , {
                    label: 'Payment Info ',
                    field: 'paymentInfo',
                    sort: 'asc'
                }
                , {
                    label: 'Order Status',
                    field: 'orderStatus',
                    sort: 'asc'
                }
                , {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                user:  <Link  to={`/admin/users/${order.user}`}>{order.user}</Link>,
                orderItems:
                    <Fragment>
                        {order.orderItems.map((orderItem) => (
                            <div key={orderItem._id}>
                                <p>Name: {orderItem.name}</p>
                                <p>Quantity: {orderItem.quantity}</p>
                                <p>Price: {orderItem.price}</p>
                                <img src={orderItem.image} alt={'item avatar'} className={"mt-3 mr-2"} width={'55'} height={'52'}/>
                            </div>
                            ))}
                    </Fragment>,
                itemsPrice: order.itemsPrice,
                taxPrice: order.taxPrice,
                shippingPrice: order.shippingPrice,
                totalPrice: order.totalPrice,
                deliveredAt: moment(order.deliveredAt).format('MM/DD/YY, h:mm a'),
                orderStatus: order.orderStatus,
                paidAt:moment(order.paidAt).format('MM/DD/YY, h:mm a'),
                shippingInfo:
                    <Fragment>
                        <p>{order.shippingInfo.address}</p>
                        <p>{order.shippingInfo.phoneNumber}</p>
                        <p>{order.shippingInfo.postalCode}</p>
                        <p>{order.shippingInfo.city},{order.shippingInfo.country}</p>
                    </Fragment>,
                paymentInfo:
                    <Fragment>
                        <p>{order.paymentInfo.status === 'succeed' ? "Paid" : "Not Paid"}</p>
                    </Fragment>,
                actions:
                    <Fragment>
                        <Link className={'btn btn-primary'} to={`/admin/product/${order._id}`}><i
                            className={'fa fa-eye'}/></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2">
                            <i className={'fa fa-trash'}/>
                        </button>
                    </Fragment>,

            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={"Admin Orders"}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>
                        {loading ? <Loader/> : (
                            <Fragment>
                                <MDBDataTable
                                    data={setOrders()}
                                    className={'px-3'}
                                    bordered
                                    striped
                                    hover
                                />
                            </Fragment>
                        )}
                    </Fragment>
                </div>
            </div>


        </Fragment>
    )
}


export default AdminOrders