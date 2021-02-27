import React, {Fragment, useEffect, useState} from "react";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors} from "../../actions/order";
import {UPDATE_PRODUCT_RESET} from "../../constants/productConstants";
import {getProductDetails, updateProduct} from "../../actions/products";
import Loader from "../layouts/Loader";
import SideBar from "./sideBar";
import {categories} from "../../constants/common";

function UpdateProduct({match, history}) {
    const alert = useAlert();
    const [name, setProductName] = useState('');
    const [price, setProductPrice] = useState('');
    const [description, setProductDescription] = useState('');
    const [seller, setProductSeller] = useState('');
    const [category, setProductCategory] = useState('');
    const [currency, setProductCurrency] = useState('');
    const [stock, setProductStock] = useState(0);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const dispatch = useDispatch();
    const {error, product} = useSelector(state => state.productDetails);
    const {loading, error: updateError, isUpdated} = useSelector(state => state.product);
    const productId = match.params.id;
    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setProductName(product && product.name);
            setProductPrice(product && product.price);
            setProductCategory(product && product.category);
            setProductStock(product && product.stock);
            setProductSeller(product && product.seller);
            setProductCurrency(product && product.currency);
            setProductDescription(product && product.description);
            setOldImages(product && product.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            history.push('/dashboard/products');
            alert.success('Product updated successfully');
            dispatch({type: UPDATE_PRODUCT_RESET});
        }
    }, [dispatch, error, alert, isUpdated, product, updateError, productId, history]);


    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("stock", stock);
        formData.set("seller", seller);
        formData.set("category", category);
        formData.set("currency", currency);
        imagesPreview.forEach(image => {
            formData.append("images", image);
        })
        dispatch(updateProduct(product._id, formData));
    };
    const onChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesPreview([]);
        setOldImages([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    }
    return (
        <Fragment>
            <MetaData title={"Update  A Product"}/>
            {loading ? <Loader/> : (
                <Fragment>
                    <div className="row ">
                        <div className="col-12 col-md-2">
                            <SideBar/>
                        </div>
                        <div className="col-12 col-md-10">
                            <br/>
                            <form className="shadow-lg col-8 m-auto p-3 mt-5" encType='multipart/form-data'
                                  onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Product</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        name='name'
                                        className="form-control"
                                        value={name?name:''}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        name='price'
                                        value={price?price:''}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Currency</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        name='currency'
                                        value={currency?currency:''}
                                        onChange={(e) => setProductCurrency(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8"
                                              value={description?description:''}
                                              name={'description'}
                                              onChange={(e) => setProductDescription(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field"
                                            name='category'
                                            value={category?category:''}
                                            onChange={(e) => setProductCategory(e.target.value)}>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stock_field">Stock</label>
                                    <input
                                        type="number"
                                        id="stock_field"
                                        className="form-control"
                                        value={stock?stock:''}
                                        name={'stock'}
                                        onChange={(e) => setProductStock(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="seller_field">Seller Name</label>
                                    <input
                                        type="text"
                                        id="seller_field"
                                        className="form-control"
                                        name={'seller'}
                                        value={seller?seller:''}
                                        onChange={(e) => setProductSeller(e.target.value)}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Images</label>
                                    <div className='custom-file'>
                                        <input
                                            type='file'
                                            name='product_images'
                                            className='custom-file-input'
                                            id='customFile'
                                            multiple
                                            onChange={onChange}
                                        />
                                        <label className='custom-file-label' htmlFor='customFile'>
                                            Choose Images
                                        </label>
                                    </div>
                                    <hr className={"p-0 m-0 w-100"}/>
                                    {oldImages && oldImages.map((img, key) => (
                                        <img src={img.url} key={key} alt={img.url} className={"mt-3 mr-2"}
                                             width={'55'} height={'52'}/>
                                    ))}
                                    <hr className={"p-0 m-0 w-100"}/>
                                    {imagesPreview.map((img, key) => (
                                        <img src={img} key={key} alt={"product images"} className={"mt-3 mr-2"}
                                             width={'55'} height={'52'}/>
                                    ))}
                                </div>
                                <button
                                    id="login_btn"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading}
                                >
                                    UPDATE
                                </button>
                            </form>
                            <br/>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}


export default UpdateProduct