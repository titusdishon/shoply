import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import {getAdminProducts} from "../../actions/products";

function ProductList() {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state => state.products);
    useEffect(() => {
        dispatch(getAdminProducts())
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                }, {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                }
                , {
                    label: 'Stock',
                    field: 'stock',
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
        products && products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                stock: product.stock,
                price: product.price,
                actions:
                    <Fragment>
                        <Link className={'btn btn-primary'} to={`/admin/product/${product._id}`}><i
                            className={'fa fa-eye'}/></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2">
                            <i className={'fa fa-trash'}/>
                        </button>
                    </Fragment>
            })
        })
        return data;
    }
    return (
        <Fragment>
            <MetaData title={"Admin-products"}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All products</h1>
                        {loading ? <Loader/> : (
                            <Fragment>
                                <MDBDataTable
                                    data={setProducts()}
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


export default ProductList