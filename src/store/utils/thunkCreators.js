import axios from "axios";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";
import qs from "qs";
import { useHistory } from "react-router-dom";


const BASE_URL = "http://localhost:8080";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const token = localStorage.token ? localStorage.token : "";
    const { data } = await axios.get(BASE_URL + "/users/me/", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });

    dispatch(gotUser(data));
    
    console.log('got data----', data)
    // if (data.email_id && window.location.href !== 'http://localhost:3000/home') {

    //   // history.push("/home");
    //   window.location.href = 'http://localhost:3000/home'
    // }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const signup = (payload) => async (dispatch) => {
  try {

    console.log("singup----", payload);
    const data = await axios.post(BASE_URL + "/sign_up", payload);
    const token_payload = qs.stringify({
      grant_type: "",
      username: "thomas@email.com",
      password: "thomas",
      scope: "",
      client_id: "",
      client_secret: "",
    });

    const token_res = await axios.post(BASE_URL + "/token", token_payload);
    const { access_token } = token_res.data;
    await localStorage.setItem("token", access_token);
    dispatch(gotUser(data.data));
    //
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const data = await axios.post(BASE_URL + "/auth/login", credentials);
    await localStorage.setItem("socket_token", data.socket_token);
    dispatch(gotUser(data));
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    // await axios.delete("/auth/logout");
    await localStorage.clear();
    dispatch(gotUser({}));
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get(BASE_URL + "/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};
