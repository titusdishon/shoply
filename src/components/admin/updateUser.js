import React, {Fragment, useEffect, useState} from "react";
import MetaData from "../layouts/MetaData";
import SideBar from "./sideBar";
import Loader from "../layouts/Loader";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_USER_RESET} from "../../constants/authConstants";
import {clearErrors, getUserDetails, updateUser} from "../../actions/user";
import {useAlert} from "react-alert";

function UpdateUser({history, match}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isActive, setIsActive] = useState('')
    const [role, setRole] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error, isUpdated} = useSelector(state => state.user);
    const {user, loading} = useSelector(state => state.userDetails);
    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setPhoneNumber((user && user.phoneNumber)||'');
            setName((user && user.name)||'');
            setEmail((user && user.email)||'');
            setIsActive((user && user.isActive)||'');
            setRole((user && user.role)||'');
        }
        if (isUpdated) {
            alert.success("User updated successfully");
            history.push('/dashboard/users');
            dispatch({
                type: UPDATE_USER_RESET
            })
        }
        console.log("USER", error);
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [userId, isUpdated, user, error])


    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('phoneNumber', phoneNumber);
        formData.set('isActive', isActive);
        formData.set('role', role);
        dispatch(updateUser(userId, formData));
    }
    return (
        <Fragment>
            <MetaData title={"Update user"}/>
            {loading ? <Loader/> :
                <div className="row">
                    <div className="col-12 col-md-2">
                        <SideBar/>
                    </div>
                    <div className="col-12 col-md-10">
                        <Fragment>
                            <div className="row wrapper">
                                <form className="shadow-lg col-lg-5 col-md-6 col-sm-12" onSubmit={submitHandler}>
                                    <h1 className="mt-2 mb-5">Update User</h1>
                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Phone Number</label>
                                        <input
                                            type="text"
                                            id="email_field"
                                            className="form-control"
                                            name='phoneNumber'
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role_field">Role</label>
                                        <select
                                            id="role_field"
                                            className="form-control"
                                            name='role'
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" name={"isActive"} type="checkbox"
                                               value={isActive} checked={isActive} id="flexCheckDefault"
                                               onChange={(e) => setRole(e.target.value)}/>
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Is Active
                                        </label>
                                    </div>
                                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update</button>
                                </form>
                            </div>
                        </Fragment>
                    </div>
                </div>}
        </Fragment>
    )
}

export default UpdateUser;