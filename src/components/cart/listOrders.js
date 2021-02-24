import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {MDBDataTable} from "mdbreact";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors, getMyOrders} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";

function ListOrders() {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, orders} = useSelector(state => state.myOrders);
    useEffect(() => {
        dispatch(getMyOrders())
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order Id',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Number Of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                }, {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                }
                , {
                    label: 'Status',
                    field: 'status',
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
        orders&&orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ?
                    <p className={"text-success"}> {order.orderStatus}</p> :
                    <p className={"text-danger"}> {order.orderStatus}</p>,
                actions: <Link className={'btn btn-success'} to={`/order/${order._id}`}><i className={'fa fa-eye'}/>
                </Link>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={"My Orders"}/>
            <h1 className={"mt-5"}>My Orders</h1>
            {loading ? <Loader/> : (
                <MDBDataTable
                    data={setOrders()}
                    className={'px-3'}
                    bordered
                    striped
                    hover
                />
            )}
        </Fragment>
    )
}


export default ListOrders