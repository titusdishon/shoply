import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { register, clearErrors } from "../../actions/user";
import { Link } from "react-router-dom";

function Register({ history }) {
  const [avatarPriview, setAvatarPriview] = useState(
    "./images/default_avatar.jpg"
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, history, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("password", user.password);
    formData.set("email", user.email);
    formData.set("role", user.role);
    formData.set("phoneNumber", user.phoneNumber);
    formData.set("avatar", avatarPriview);

    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPriview(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"register"} />
          <div className="row wrapper">
            <div className="col-12 col-lg-5 col-sm-12">
              <form
                className="shadow-lg"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <h4 className="mb-3">Register</h4>
                <div className="form-group">
                  <label htmlFor="email_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={user.name}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone_field">Phone Number</label>
                  <input
                    type="text"
                    id="phone_field"
                    name="phoneNumber"
                    className="form-control"
                    value={user.phoneNumber}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={onChange}
                  />
                </div>
                <select
                  id="role_field"
                  className="form-control"
                  value={user.role}
                  name="role"
                  onChange={onChange}
                  required
                >
                  <option value={"user"}>User</option>
                  <option value={"admin"}>Marchant</option>
                </select>
                <div className="form-group">
                  <label htmlFor="avatar_upload">Avatar</label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPriview}
                          className="rounded-circle"
                          alt="avatar priview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  id="register_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading}
                >
                  REGISTER
                </button>
                <Link to="/login" className="float-right ">
                  Already have an account?
                </Link>
                <br/>
                <br/>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Register;
