import React,{ useEffect } from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/products/ProductDetails";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { loadUser } from "./actions/user";
import store from "./store";
import "./App.css";
import Login from "./components/user/Login";
import Register from "./components/user/Register";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/product/:id" component={ProductDetails} exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
