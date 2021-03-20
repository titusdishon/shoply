import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import {deleteProduct, getAdminProducts} from "../../actions/products";
import {DELETE_PRODUCT_RESET} from "../../constants/productConstants";

function ProductList({history}) {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, products} = useSelector(state => state.products);
    const {error: deleteError, isDeleted, loading: isLoading} = useSelector(state => state.product);
    useEffect(() => {
        dispatch(getAdminProducts())
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch({type: DELETE_PRODUCT_RESET});
        }
        if (isDeleted) {
            alert.success("Product deleted successfully");
            history.push('/dashboard/products')
            dispatch({type: DELETE_PRODUCT_RESET});
        }
    }, [dispatch, error, alert, deleteError, isDeleted, history]);

    const deleteAProduct = (e, pid) => {
        dispatch(deleteProduct(pid))
    }

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
                        <Link className={'btn btn-primary'} to={`/dashboard/product/update/${product._id}`}><i
                            className={'fa fa-edit'}/></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2"
                                onClick={(e) => deleteAProduct(e, product._id)}>
                            <i className={'fa fa-trash'}/>
                        </button>
                    </Fragment>
            })
        })
        return data;
    }


    return (
        <Fragment>
            {(isLoading || loading) && <Loader/>}
            <MetaData title={"Admin-products"}/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h3 className="my-2 pl-3">All products</h3>
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