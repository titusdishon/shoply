import React, {Fragment, useEffect, useState} from "react";
import MetaData from "../layouts/MetaData";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layouts/Loader";
import SideBar from "./sideBar";
import {useAlert} from "react-alert";
import {newProduct} from "../../actions/products";
import {clearErrors} from "../../actions/order";
import {NEW_PRODUCT_RESET} from "../../constants/productConstants";
import {categories} from "../../constants/common";


function NewProduct({history}) {
    const alert = useAlert();
    const [name, setProductName] = useState('');
    const [price, setProductPrice] = useState('');
    const [description, setProductDescription] = useState('');
    const [seller, setProductSeller] = useState('');
    const [category, setProductCategory] = useState('');
    const [currency, setProductCurrency] = useState('');
    const [stock, setProductStock] = useState(0);
    const [images, setProductImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const dispatch = useDispatch()
    const {loading, error, success} = useSelector(state => state.newProduct);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            history.push('/dashboard/products');
            alert.success('Product created successfully');
            dispatch({type: NEW_PRODUCT_RESET});
        }
    }, [dispatch, error, alert, success, history]);


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
        images.forEach(image => {
            formData.set("images", image);
        })
        dispatch(newProduct(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesPreview([]);
        setProductImages([]);

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                    setProductImages(oldArray => [...oldArray, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        })
    }

    return (
        <Fragment>
            <MetaData title={"New Product"}/>
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
                                <h1 className="mb-4">New Product</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        name='name'
                                        className="form-control"
                                        value={name}
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
                                        value={price}
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
                                        value={currency}
                                        onChange={(e) => setProductCurrency(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea className="form-control" id="description_field" rows="8"
                                              value={description}
                                              name={'description'}
                                              onChange={(e) => setProductDescription(e.target.value)}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select className="form-control" id="category_field"
                                            name='category'
                                            value={category}
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
                                        value={stock}
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
                                        value={seller}
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
                                    {imagesPreview.map((img, key) => (
                                        <img src={img} key={key} alt={"product images"} className={"mt-3 mr-2"}
                                             width={'55'} height={'52'}/>
                                    ))}
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading}
                                >
                                    CREATE
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

export default NewProduct