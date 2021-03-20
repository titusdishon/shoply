import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import MetaData from "../layouts/MetaData";
import {useAlert} from "react-alert";
import {clearErrors} from "../../actions/order";
import Loader from "../layouts/Loader";
import {Link} from "react-router-dom";
import SideBar from "./sideBar";
import {MDBDataTable} from "mdbreact";
import moment from "moment";
import {deleteUser, getAllUsers} from "../../actions/user";
import {DELETE_USER_RESET} from "../../constants/authConstants";

function UsersList({history}) {
    const alert = useAlert();
    const dispatch = useDispatch()
    const {loading, error, users} = useSelector(state => state.users);
    const {isDeleted} = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getAllUsers())
        if (isDeleted) {
            alert.success("User deleted successfully");
            history.push("/dashboard/users");
            dispatch(getAllUsers())
            dispatch({type: DELETE_USER_RESET});
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert, isDeleted, history]);

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'Avatar',
                    field: 'avatar',
                    sort: 'asc'
                }, {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                }, {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                }, {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                }, {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                }, {
                    label: 'Phone Number',
                    field: 'phoneNumber',
                    sort: 'asc'
                }, {
                    label: 'Status',
                    field: 'isActive',
                    sort: 'asc'
                }
                , {
                    label: 'Joined',
                    field: 'createdAt',
                    sort: 'asc'
                }, {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        users && users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phoneNumber: user.phoneNumber,
                isActive: <Fragment>
                    <p>{user.isActive ? "Active" : 'Not active'}</p>
                </Fragment>,
                avatar: <Fragment>
                    <img src={user.avatar.url} alt={user.name} className={"mt-3 mr-2"} width={'55'} height={'52'}/>
                </Fragment>,
                createdAt: moment(user.createdAt).format('MM/DD/YY, h:mm a'),
                actions:
                    <Fragment>
                        <Link className={'btn btn-primary'} to={`/dashboard/user/update/${user._id}`}><i
                            className={'fa fa-edit'}/></Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                            <i className={'fa fa-trash'}/>
                        </button>
                    </Fragment>,

            })
        })
        return data;
    }

    //delete an order
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }
    return (
        <Fragment>
            <MetaData title={"All User"}/>
            {loading ? <Loader/> : <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar/>
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h3 className="my-2 pl-3">All Users</h3>
                        {loading ? <Loader/> : (
                            <Fragment>
                                <MDBDataTable
                                    data={setUsers()}
                                    className={'px-3'}
                                    bordered
                                    striped
                                    hover
                                />
                            </Fragment>
                        )}
                    </Fragment>
                </div>
            </div>}
        </Fragment>
    )
}


export default UsersList