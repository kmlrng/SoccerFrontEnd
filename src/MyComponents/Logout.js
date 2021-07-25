import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Logout.css";
// import {selectUser } from "../features/userSlice";
import { logout } from "../store/utils/thunkCreators";

import { connect } from "react-redux";
const Logout = (props) => {
  const dispatch = useDispatch();
  
  const logout = (e) => {
    dispatch(props.logout());
  };

  return (
    <form className="logout">
      <h1>
        Welcome <span className="user__name">{props.user.email}</span>!
      </h1>
      <button className="logout__button" onClick={(e) => logout(e)}>
        Log out
      </button>
      <p></p>
    </form>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (payload) => {
      dispatch(logout(payload));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Logout);

