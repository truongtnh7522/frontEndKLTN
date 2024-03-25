import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Logo2 from "../../assets/LogoLoad.png";
import { fetchInfo } from "../../redux/features/info/infoSlice";
import { useNavigate } from "react-router-dom";
import {
  CiChat2,
  CiHeart,
  CiSearch,
  CiSquarePlus,
  CiUser,
  CiVideoOn,
  CiLogout,
} from "react-icons/ci";

import { login } from "../../redux/features/login/loginAPI";
import { GoHome } from "react-icons/go";
import ButtonHeader from "../Button/ButtonHeader";
import { IoLogOutOutline } from "react-icons/io5";
import getInfo from "../../redux/features/info/getInfoAPI";
import { Link } from "react-router-dom";
import {
  logoutSuccess,
  setCurrentUser,
} from "../../redux/features/login/loginSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  useEffect(() => {
    dispatch(fetchInfo());
  }, []);
  // useEffect(() => {
  //   getInfo().then(({ data, error }) => {
  //     if (error) {
  //       navigate("/bad-not-found");
  //     } else {
  //       // Xử lý dữ liệu ở đây nếu cần
  //       console.log(data);
  //     }
  //   });
  // }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasInfor");
    // const data = {
    //   email: "",
    //   password: "",
    // };
    // console.log(data);
    // login(dispatch, data);
    console.log("Co vao lan 1");
    dispatch(logoutSuccess());
    navigate("/login");
  };
  console.log(info);
  return (
    <div className="sticky top-[80px] h-[100vh] ">
      <div className="navigation-card bg-[#ffffff] sticky top-[80px]">
        <ButtonHeader classNames="tab" to="/">
          <GoHome />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/search">
          <CiSearch />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/notification">
          <CiHeart />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/call-group">
          <CiVideoOn />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiChat2 />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/list-friend">
          <CiUser />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/add-post">
          <CiSquarePlus />
        </ButtonHeader>
        <button className="tab   " onClick={handleLogout}>
          <IoLogOutOutline />
        </button>
        <Link to="/personal">
          {" "}
          <img src={info?.data?.image || Logo2} alt="" className="tab-img" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
