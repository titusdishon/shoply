import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, loadUser, updateProfile} from "../../actions/user";
import Loader from "../layouts/Loader";
import {UPDATE_PROFILE_RESET} from "../../constants/authConstants";
import {useAlert} from "react-alert";
import MetaData from "../layouts/MetaData";


function UpdateUserProfile({history}) {
    const dispatch = useDispatch();
    const [userData, setUser] = useState({name: "", email: "",})
    const [avatar, setAvatar] = useState('');
    const {user} = useSelector((state) => state.auth);
    const { loading,isUpdated, error} = useSelector((state) => state.user);
    const alert=useAlert();
    useEffect(() => {
       if (user){
           setUser(user);
           setAvatar(user.avatar.url)
       }
       if (error){
           alert.error(error);
           dispatch(clearErrors());
       }
       if(isUpdated){
           alert.success("User updated successfully")
           dispatch(loadUser());
           history.push("/profile");
           dispatch({
               type:UPDATE_PROFILE_RESET
           })
       }
    }, [user, error,isUpdated, alert, dispatch,history])
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("name", userData.name);
        formData.set("email", userData.email);
        formData.set("avatar", avatar);
        dispatch(updateProfile(formData));
    }
    const onChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({...userData, [e.target.name]: [e.target.value]})
        }
    }
    return (
        <Fragment>
            <MetaData title={"update profile"}/>
            {!loading ?
                <Fragment>
                    <div className="container-container-fluid">
                        <div className="row wrapper">
                            <div className="col-10 col-lg-5">
                                <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                    <h1 className="mt-2 mb-5">Update Profile</h1>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Name</label>
                                        <input
                                            type="name"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            onChange={onChange}
                                            value={userData.name}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email_field">Email</label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            onChange={onChange}
                                            value={userData.email}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='avatar_upload'>Avatar</label>
                                        <div className='d-flex align-items-center'>
                                            <div>
                                                <figure className='avatar mr-3 item-rtl'>
                                                    <img
                                                        src={avatar}
                                                        className='rounded-circle'
                                                        alt='Avatar Preview'
                                                    />
                                                </figure>
                                            </div>
                                            <div className='custom-file'>
                                                <input
                                                    type='file'
                                                    name='avatar'
                                                    onChange={onChange}
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    accept={"images/*"}
                                                />
                                                <label className='custom-file-label' htmlFor='customFile'>
                                                    Choose Avatar
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment> :
                <Fragment>
                    <Loader/>
                </Fragment>
            }
        </Fragment>
    )
}

export default UpdateUserProfile;