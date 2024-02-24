import publicAxios from "../../../services/requestMethods";
import API from "../../../services/API";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    signupStart,
    signupSuccess,
    signupFailure,
  } from "./loginSlice";
 import { Toaster } from "react-hot-toast";
 import { successToast } from "../../../utils/getToast";

 export const login = async (dispatch: any, data: any): Promise<void> => {
  dispatch(loginStart());
  try {
    const res = await publicAxios.post(API.LOGIN, data);
   
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error(err);
    dispatch(loginFailure());

  }
};
export const signup = async (dispatch:any, data:any) => {
    dispatch(signupStart());
    try {
      const res = await publicAxios.post(API.REGISTER, data);
      dispatch(signupSuccess(res.data));
    } catch (err) {
      dispatch(signupFailure());
    }
  };
  