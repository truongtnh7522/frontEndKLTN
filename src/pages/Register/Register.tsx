import { Link } from "react-router-dom";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import CustomButton from "../../components/CustomButton";
import TextInput from "../../components/TextInput";
import BgImage from "../../assets/img.jpeg";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../redux/features/login/loginAPI";
import { RootState } from "../../redux/store";
import ImgA1 from "../../assets/login/img1.svg";
import ImageMain from "../../assets/login/ImgMain.png";
import ImageMain1 from "../../assets/login/log.svg";
import ImageMain2 from "../../assets/login/register.svg";
import "./style.css";
import toast, { Toaster } from "react-hot-toast";
import {
  Email,
  EmailRegis,
  Password,
  tokenState,
} from "../../recoil/initState";
import { FormProvider, useForm } from "react-hook-form";

import API from "../../services/API";
const Register = () => {
  const history = useNavigate();
  // const [signIn, toggle] = React.useState(true);
  const [emailRecoil, setEmailRecoil] = useRecoilState(Email);
  const [emailRegisRecoil, setEmailRegisRecoil] = useRecoilState(EmailRegis);
  const [passwordRecoil, setPasswordRecoil] = useRecoilState(Password);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Register
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [comFirmPassword, setComFirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setToken] = useRecoilState(tokenState);
  useEffect(() => {
    const user = localStorage.getItem("token");

    if (user) history("/");
  }, [history]);

  const handleRegister = async () => {
    try {
      setComFirmPass(true);
      setIsLoading(true);
      if (password1 === comFirmPassword) {
        const data = {
          email: email,
          password: password1,
        };

        fetch(API.REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Đặt cookie vào header
            // Cookie: cookieJar.getCookieStringSync(API.REGISTER),
          },
          body: JSON.stringify(data),

          credentials: "include",
        })
          .then((response) => {
            // Xử lý cookie từ response nếu cần thiết
            console.log(response);
            const cookies = response.headers.get("set-cookie");

            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data?.message == "Email is exist") {
              toast.error("Tài khoản đã được đăng ký!");
              setIsLoading(false);
            } else {
              setEmailRegisRecoil(email);
              navigate("/verify");
            }
          })
          .catch((error) => {
            // Xử lý lỗi ở đâ
          });
      } else {
        setComFirmPass(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed", error);
    }
  };
  // Login

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isFetching = useSelector((state: RootState) => state.user.isFetching);
  useEffect(() => {
    if (currentUser?.data.success === true) {
      console.log(currentUser);
      toast.success("Đăng nhập thành công!");
      setToken(currentUser?.data?.data?.jwtToken);
      localStorage.setItem("token", currentUser?.data?.data?.jwtToken);
      localStorage.setItem("hasInfor", currentUser?.data?.data?.hasInfor);
      // Ẩn toast
      if (currentUser?.data?.data?.hasInfor == false) {
        navigate("/add-info");
      } else {
        navigate("/");
      }
    }
    if (error == true && isFetching == false) {
      setIsLoading(false);
      toast.error("Đăng nhập thất bại!");
    }
  }, [currentUser, error, isFetching]);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log(email, password1);
    try {
      const data = {
        email: email,
        password: password1,
      };

      login(dispatch, data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const [trans, setTrans] = useState(true);
  const [comFirmPass, setComFirmPass] = useState(true);
  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl">
        {/* LEFT */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-[#456fe6]">
          <div className="relative w-full flex items-center justify-center">
            <img
              src={BgImage}
              alt="Bg Image"
              className="w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover"
            />

            <div className="absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full">
              <BsShare size={14} />
              <span className="text-xs font-medium">Share</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full">
              <ImConnection />
              <span className="text-xs font-medium">Connect</span>
            </div>

            <div className="absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full">
              <AiOutlineInteraction />
              <span className="text-xs font-medium">Interact</span>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-white text-base">
              Connect with friedns & have share for fun
            </p>
            <span className="text-sm text-white/80">
              Share memories with friends and the world.
            </span>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center text-left">
          <div className="w-full flex gap-2 items-center mb-6">
            <div className="p-2 bg-[#065ad8] rounded text-white">
              <TbSocial />
            </div>
            <span className="text-2xl text-[#065ad8] font-semibold">
              TKCSOCIAL
            </span>
          </div>

          <p className="text-ascent-1 text-base font-semibold">
            Log up to your account
          </p>
          <span className="text-sm mt-2 text-ascent-2">Welcome back</span>

          <div className="py-8 flex flex-col gap-5=">
            <div className="w-full flex flex-col mt-2">
              <p className={`text-ascent-2 text-sm mb-2 ml-2`}>Email</p>

              <div>
                <input
                  name="Email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] w-full rounded-full`}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              {error && (
                <span className="text-xs text-[#f64949fe] mt-0.5 ">
                  {error}
                </span>
              )}
            </div>

            {/* <TextInput
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
              styles="w-full rounded-full"
              labelStyle="ml-2"
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            /> */}
            <div className="w-full flex flex-col mt-2">
              <p className={`text-ascent-2 text-sm mb-2 ml-2`}>Password</p>

              <div>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] w-full rounded-full`}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              {error && (
                <span className="text-xs text-[#f64949fe] mt-0.5 ">
                  {error}
                </span>
              )}
            </div>

            <div className="w-full flex flex-col mt-2">
              <p className={`text-ascent-2 text-sm mb-2 ml-2`}>
                Comfirm Password
              </p>

              <div>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setComFirmPassword(e.target.value)}
                  placeholder="Comfirm Password"
                  className={`bg-secondary rounded border mb-4 border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] w-full rounded-full`}
                  aria-invalid={error ? "true" : "false"}
                />
              </div>
              {error && (
                <span className="text-xs text-[#f64949fe] mt-0.5 ">
                  {error}
                </span>
              )}
            </div>
            <div
              onClick={handleRegister}
              className={` items-center  inline-flex justify-center rounded-md bg-[#456fe6] px-8 py-3 text-sm font-medium text-white outline-none`}
            >
              {isLoading ? <div className="loader"></div> : "Sign Up"}
            </div>
          </div>

          <p className="text-ascent-2 text-sm text-center">
            Already have a password!
            <Link
              to="/register"
              className="text-[#065ad8] font-semibold ml-2 cursor-pointer"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
