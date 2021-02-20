import React, {Fragment} from "react";
import MetaData from "../layouts/MetaData";
import {useSelector} from "react-redux";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";


function Profile() {
    const {user, loading} = useSelector(state => state.auth);
    return (
        <Fragment>
            <MetaData title={user && user.name}/>
            {loading ? <Loader/> : <Fragment>
                <h2 className="mt-5 ml-5">My Profile</h2>
                <div className="row justify-content-around mt-5 user-info">
                    <div className="col-12 col-md-3">
                        <figure className='avatar avatar-profile'>
                            <img className="rounded-circle img-fluid" src={user && user.avatar && user.avatar.url}
                                 alt=''/>
                        </figure>
                        <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                            Edit Profile
                        </Link>
                    </div>
                    <div className="col-12 col-md-5">
                        <h4>Full Name</h4>
                        <p>{user && user.name}</p>
                        <h4>Email Address</h4>
                        <p>{user && user.email}</p>
                        <h4>Joined</h4>
                        <p>{String(user && user.createdAt).substring(0, 10)}</p>
                        {user.role !== 'admin' && <Link to="/me/orders" className="btn btn-danger btn-block mt-5">
                            My Orders
                        </Link>}
                        <Link to={"/new/password"} className="btn btn-primary btn-block mt-3">
                            Change Password
                        </Link>
                    </div>
                </div>
            </Fragment>}
        </Fragment>
    )
}

export default Profile;