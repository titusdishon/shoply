import React, {Fragment} from "react";
import logo from "../../assets/images/logo.png";
import {Link} from "react-router-dom";
import Search from "./Search";
import {Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

function Header() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {user, loading} = useSelector((state) => state.auth);

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
              <div className={"container"}>
                  <Navbar.Brand href="#home">
                      <Link to="/">
                          <img src={logo} alt={"avatar"}/>
                      </Link>
                  </Navbar.Brand>
                  <Nav className="col-12 col-md-6 mt-2 ml-lg-5 bg">
                      <Route render={({history}) => <Search history={history}/>}/>
                  </Nav>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">

                      <Nav href="#pricing" className="ml-1">
                          <span id="cart">Cart 2</span>
                      </Nav>
                      <Nav>
                          {user ? (
                              <NavDropdown  title={"Account"}  id="collasible-nav-dropdown">
                                  <NavDropdown.Item href="#action/3.1">
                                      <figure className="avatar avatar-nav">
                                          <img src={user.avatar && user.avatar.url}
                                               className="rounded-circle"
                                          />
                                      </figure>
                                      <span>{user.name && user.name}</span>
                                  </NavDropdown.Item>
                                  {user && user.role !== "admin" ? (
                                      <NavDropdown.Item to="/orders">
                                          orders
                                      </NavDropdown.Item>
                                  ) : (
                                      <NavDropdown.Item className="dropdown-item " to="/dashboard">
                                          Dashboard
                                      </NavDropdown.Item>
                                  )}
                              </NavDropdown>
                          ) : (!loading && (
                                  <NavDropdown title={user && user.name} id="collasible-nav-dropdown">
                                      <NavDropdown.Item href="/login">
                                          Login
                                      </NavDropdown.Item>
                                  </NavDropdown>
                              )
                          )}
                      </Nav>
                  </Navbar.Collapse>
              </div>
            </Navbar>
        </Fragment>
    );
}

export default Header;
