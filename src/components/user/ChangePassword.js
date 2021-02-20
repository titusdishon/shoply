import React, {Fragment, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import Loader from "../layouts/Loader";
import {changePassword, clearErrors, loadUser} from "../../actions/user";
import {UPDATE_PASSWORD_RESET} from "../../constants/authConstants";
import {useAlert} from "react-alert";

function ChangePassword({history}) {
    const dispatch = useDispatch();
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: ""
    });
    const alert = useAlert()
    const { loading,isUpdated, error} = useSelector((state) => state.user);
    const onChange = (e) => {
        setPasswords({...passwords, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password updated successfully")
            dispatch(loadUser());
            history.push("/");
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [error, isUpdated, alert, dispatch, history])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword(passwords));
    }
    return (
        <Fragment>
            {!loading ?
                <Fragment>
                    <div className="container-container-fluid">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" onSubmit={submitHandler}>
                                    <h1 className="mb-3">Change Password</h1>
                                    <div className="form-group">
                                        <label htmlFor="password_field">Old Password</label>
                                        <input
                                            type={"password"}
                                            name="oldPassword"
                                            id="password_field"
                                            className="form-control"
                                            onChange={onChange}
                                            value={passwords.oldPassword}
                                        />
                                    </div>
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
                                        disabled={passwords.confirmPassword=== '' ||passwords.confirmPassword !==passwords.password||loading}
                                        className="btn btn-block py-3">
                                        Set Password
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </Fragment> :
                <Fragment>
                    <Loader/>
                </Fragment>}
        </Fragment>
    )
}

export default ChangePassword;