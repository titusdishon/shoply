import React, {useEffect} from "react";
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
import {useSelector} from "react-redux";
import NewPassword from "./components/user/NewPassword";

function App() {
    const {isAuthenticated} = useSelector((state) => state.auth);
    useEffect(() => {
       return {
           if (isAuthenticated){
               store.dispatch(loadUser()).then(r => {});
           }
       }
    }, [isAuthenticated]);

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
                    <Route path="/product/:id" component={ProductDetails} exact/>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
