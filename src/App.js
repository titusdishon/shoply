import React, {useEffect, useState} from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/products/ProductDetails";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {loadUser} from "./actions/user";
import store from "./store";
import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateUserProfile from "./components/user/updateProfile";
import ChangePassword from "./components/user/ChangePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";
import Payment from "./components/cart/payment";
import axios from 'axios';
import OrderSuccess from "./components/cart/order-success";
import ListOrders from "./components/cart/listOrders";
import OrderDetails from "./components/cart/orderDetails";
import Dashboard from "./components/admin/dashboard";
import ProductList from "./components/admin/productList";
import NewProduct from "./components/admin/newProduct";
import {useSelector} from "react-redux";
import AdminOrders from "./components/admin/ordersList";
import ConfirmOrder from "./components/cart/confirmOrder";
import UpdateProduct from "./components/admin/updateProduct";
import ProcessOrder from "./components/admin/processOrder";
import UsersList from "./components/admin/usersList";
import UpdateUser from "./components/admin/updateUser";
import ProductReviews from "./components/admin/productReviews";

function App() {
    const [stripe_api, setStripe] = useState();
    const {user, loading} = useSelector(state => state.auth);
    useEffect(() => {
        async function getStripeApiKey() {
            const {data} = await axios.get('/api/v1/stripe-api');
            setStripe(data.stripeApiKey);
        }
        console.log("Hello",window.location.pathname)
        if (window.location.pathname!=="/login"&&window.location.pathname!=="/register"){
            getStripeApiKey().then();
            store.dispatch(loadUser()).then(r => {
            });
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="container container-fluid">
                    <Route path="/" component={Home} exact/>
                    <Route path="/search/:keyword" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/forgot/password" component={ForgotPassword}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/password/reset/:token" component={NewPassword}/>
                    <ProtectedRoute path="/profile" component={Profile}/>
                    <ProtectedRoute path="/me/update" component={UpdateUserProfile}/>
                    <ProtectedRoute path="/new/password" component={ChangePassword}/>
                    <ProtectedRoute path="/shipping" component={Shipping}/>
                    <ProtectedRoute path="/success" component={OrderSuccess}/>
                    <ProtectedRoute path="/order/confirm" component={ConfirmOrder}/>
                    <ProtectedRoute path="/orders/me" component={ListOrders}/>
                    {
                        stripe_api && <Elements stripe={loadStripe(stripe_api)}>
                            <ProtectedRoute path="/payment" component={Payment}/>
                        </Elements>
                    }
                    <Route path="/cart" component={Cart}/>
                    <Route path="/product/:id" component={ProductDetails} exact/>
                    <Route path="/order/details/:id" component={OrderDetails} exact/>
                    {/*admin routes*/}
                </div>
                <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
                <ProtectedRoute path="/dashboard/product/new" isAdmin={true} component={NewProduct} exact/>
                <ProtectedRoute path="/dashboard/products" isAdmin={true} component={ProductList} exact/>
                <ProtectedRoute path="/dashboard/users" isAdmin={true} component={UsersList} exact/>
                <ProtectedRoute path="/dashboard/orders" isAdmin={true} component={AdminOrders} exact/>
                <ProtectedRoute path="/dashboard/product/update/:id" isAdmin={true} component={UpdateProduct} exact/>
                <ProtectedRoute path="/dashboard/user/update/:id" isAdmin={true} component={UpdateUser} exact/>
                <ProtectedRoute path="/dashboard/order/:id" isAdmin={true} component={ProcessOrder} exact/>
                <ProtectedRoute path="/dashboard/reviews" isAdmin={true} component={ProductReviews} exact/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
               <br/>
                <div>
                    {!loading && user && user.role !== 'admin' && (<Footer/>)}
                </div>
            </div>
        </Router>
    );
}

export default App;
