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
import { GoHome } from "react-icons/go";
import ButtonHeader from "../Button/ButtonHeader";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  useEffect(() => {
    console.log(dispatch);
    dispatch(fetchInfo());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hasInfor");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="sticky top-[80px] h-[fit-content]">
      <div className="navigation-card bg-[#ffffff] sticky top-[80px]">
        <ButtonHeader classNames="tab" to="/">
          <GoHome />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiSearch />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiHeart />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiVideoOn />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiChat2 />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/s">
          <CiUser />
        </ButtonHeader>
        <ButtonHeader classNames="tab" to="/add-post">
          <CiSquarePlus />
        </ButtonHeader>
        <img src={info?.data?.image || Logo2} alt="" className="tab-img" />
      </div>

      <button className="Btn1 mt-2 ml-[50px]" onClick={handleLogout}>
        <div className="sign1">
          <CiLogout />
        </div>

        {/* <div className="text2" }>
          Logout
        </div> */}
      </button>
    </div>
  );
};

export default Header;
