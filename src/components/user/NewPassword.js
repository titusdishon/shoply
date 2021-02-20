import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {clearErrors, loadUser, resetPassword} from "../../actions/user";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";


function NewPassword({history,match}) {
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    });
    const alert = useAlert()
    const {loading, error, success} = useSelector((state) => state.forgotPassword);
    const onChange = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value.trim()})
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password updated successfully")
            dispatch(loadUser());
            history.push("/login");
        }
    }, [error, alert, dispatch, history,success])
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(passwords);
        dispatch(resetPassword(match.params.token,passwords));
    }
    return (
        <Fragment>
            {loading ? <Fragment>
                    <Loader/>
                </Fragment> :
                <Fragment>
                    <MetaData title={"Reset password"}/>
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">New Password</h1>
                                <div className="form-group">
                                    <label htmlFor="confirm_password_field">New Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="confirm_password_field"
                                        className={passwords.confirmPassword !== '' && passwords.confirmPassword !== passwords.password ? `required form-control` : `form-control`}
                                        onChange={onChange}
                                        value={passwords.password}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm_password_field">Confirm New Password</label>
                                    <input
                                        type={"password"}
                                        name="confirmPassword"
                                        id="confirm_password_field"
                                        className={passwords.confirmPassword !== '' && passwords.confirmPassword !== passwords.password ? `required form-control` : `form-control`}
                                        onChange={onChange}
                                        value={passwords.confirmPassword}
                                    />
                                </div>
                                {passwords.confirmPassword !== '' && passwords.confirmPassword !== passwords.password &&
                                <div className="alert-danger p-2 ">New password and confirm password do not
                                    match!!</div>}
                                <button
                                    id="new_password_button"
                                    type="submit"
                                    className="btn btn-block py-3">
                                    Set Password
                                </button>
                            </form>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    )
}

export default NewPassword;