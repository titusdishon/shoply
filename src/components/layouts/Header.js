import React, {Fragment} from "react";
import logo from "../../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {Link, Route} from "react-router-dom";
import Search from "./Search";
import {logoutUser} from "../../actions/user";
import {useAlert} from "react-alert";

function Header() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {user, isAuthenticated, loading} = useSelector((state) => state.auth);
    const {cartItems} = useSelector((state) => state.cart);
    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success("Logged out successfully");
    }
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to={"/"}>
                            <img src={logo} alt={"avatar"}/>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({history}) => <Search history={history}/>}/>
                </div>
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to={"/cart"}><span id="cart" className="ml-3">Cart</span>
                        <span className="mr-3" id="cart_count">{cartItems.length}</span></Link>
                    {isAuthenticated ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to={"#"} className={"btn dropdown-toggle text-white"}
                                  type="button" id={"dropDownMenuButton"} data-toggle={"dropdown"}
                                  aria-haspopup={"true"} aria-expanded={"false"}>
                                <figure className="avatar avatar-nav">
                                    <img src={user && user.avatar && user.avatar.url} alt={user && user.name}
                                         className={"rounded-circle"}/>
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby={"dropDownMenuButton"}>
                                {user && user.role !== 'admin' ? (
                                    <Link className={"dropdown-item "} to={"/orders"}>Orders</Link>
                                ) : (
                                    <Link className={"dropdown-item "} to={"/dashboard"}>Dashboard</Link>
                                )}
                                <Link className={"dropdown-item "} to={"/profile"}>Profile</Link>
                                <Link className={"dropdown-item "} to={"new/password"}>Change Password</Link>
                                <Link className={"dropdown-item text-danger"} to={"/"}
                                      onClick={logoutHandler}>Logout</Link>
                            </div>
                        </div>
                    ) : !loading && <Link className="btn" id="login_btn" to={"/login"}>Login</Link>}
                </div>
            </nav>
        </Fragment>
    );
}

export default Header;
