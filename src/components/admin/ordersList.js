import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors, deleteOrder, getAdminOrders} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import moment from "moment";
import {DELETE_ORDER_RESET} from "../../constants/orderConstants";

function AdminOrders({history}) {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, orders} = useSelector(state => state.adminOrders);
    const {isDeleted} = useSelector(state => state.orderUpdate);
    useEffect(() => {
        dispatch(getAdminOrders())
        if (isDeleted) {
            alert.success("Order deleted successfully");
            history.push("/dashboard/orders");
            dispatch({type: DELETE_ORDER_RESET});
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, isDeleted, alert, history]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
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
                user: <Link to={`/admin/users/${order.user}`}>{order.user}</Link>,
                itemsPrice: order.itemsPrice,
                taxPrice: order.taxPrice,
                shippingPrice: order.shippingPrice,
                totalPrice: order.totalPrice,
                deliveredAt: moment(order.deliveredAt).format('MM/DD/YY, h:mm a'),
                orderStatus: order.orderStatus,
                paidAt: moment(order.paidAt).format('MM/DD/YY, h:mm a'),
                paymentInfo:
                    <Fragment>
                        <p>{order.paymentInfo.status === 'succeeded' ? "Paid" : "Not Paid"}</p>
                    </Fragment>,
                actions:
                    <Fragment>
                        <Link className={'btn btn-primary'} to={`/dashboard/order/${order._id}`}><i
                            className={'fa fa-eye'}/></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                            <i className={'fa fa-trash'}/>
                        </button>
                    </Fragment>,

            })
        })
        return data;
    }

    //delete an order
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    return (
        <Fragment>
            <MetaData title={"Admin Orders"}/>
            {loading ? <Loader/> :
                <div className="row">
                    <div className="col-12 col-md-2">
                        <SideBar/>
                    </div>
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <h3 className="my-2 pl-3">All Orders</h3>
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
                </div>}
        </Fragment>
    )
}


export default AdminOrders