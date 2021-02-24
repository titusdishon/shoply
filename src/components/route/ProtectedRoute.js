import React, {Fragment} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";

function ProtectedRoute({isAdmin, component: Component, ...rest}) {
    const {isAuthenticated, user, loading} = useSelector(state => state.auth);
    return (
        <Fragment>
            {loading === false && (
                <Route {...rest}
                       render={props => {
                           if (isAuthenticated === false) {
                               return <Redirect to={"/login"}/>
                           }
                           if (isAuthenticated === true && user.role !== 'admin') {
                               return <Redirect to={"/"}/>
                           }
                           return <Component {...props} />
                       }
                       }/>
            )}
        </Fragment>
    )
}


export default ProtectedRoute;