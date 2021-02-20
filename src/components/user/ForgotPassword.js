import React, {Fragment, useEffect, useState} from "react";
import {clearErrors, forgotPasswordAction, loadUser} from "../../actions/user";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {UPDATE_PASSWORD_RESET} from "../../constants/authConstants";
import {useAlert} from "react-alert";
import Loader from "../layouts/Loader";


function ForgotPassword({history}) {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {message,loading, error}=useSelector((state)=>state.forgotPassword);
   const alert=useAlert();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message)
            dispatch(loadUser());
            history.push("/");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [error, alert, dispatch, message,history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordAction(email))
    }

    return (
        <Fragment>
            {!loading?<Fragment>
                <MetaData title={"Forgot password"}/>
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Forgot Password</h1>
                            <div className="form-group">
                                <label htmlFor="email_field">Enter Your Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                id="forgot_password_button"
                                type="submit"
                                disabled={email === ''||loading}
                                className="btn btn-block py-3">
                                Send Email
                            </button>
                        </form>
                    </div>
                </div>
            </Fragment>:<Fragment>
                <Loader/>
            </Fragment>}
        </Fragment>
    )
}


export default ForgotPassword;