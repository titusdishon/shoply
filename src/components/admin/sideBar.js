import React from "react";
import {Link} from "react-router-dom";

function SideBar() {

    return (
        <div className="sidebar-wrapper bg-dark">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to={"/dashboard"}><i className="fa fa-tachometer"/>Dashboard</Link>
                    </li>
                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle"><i className="fa fa-product-hunt"
                                                          aria-hidden="true"/>Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to={"/dashboard/products"}><i className="fa fa-list"/> All</Link>
                            </li>
                            <li>
                                <Link to={"/dashboard/product/new"}><i className="fa fa-plus"/> Create</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#UsersSubmenu" data-toggle="collapse" aria-expanded="false"
                           className="dropdown-toggle"><i className="fa fa-users"/>Users</a>
                        <ul className="collapse list-unstyled" id="UsersSubmenu">
                            <li>
                                <Link  to={"/dashboard/users"}><i className="fa fa-list"/> All</Link>
                            </li>
                            {/*<li>*/}
                            {/*    <Link to={"/dashboard/user/new"}><i className="fa fa-plus"/> Create</Link>*/}
                            {/*</li>*/}
                        </ul>
                    </li>
                    <li>
                        <Link to={"/dashboard/orders"}><i className="fa fa-shopping-basket"/> Orders</Link>
                    </li>
                    <li>
                        <Link to={"/dashboard/reviews"}><i className="fa fa-star"/> Reviews</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar

