import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import ImgAv from "src/assets/login/avatar.svg";
import ImgUn from "src/assets/login/unlock.svg";
import ImgWa from "src/assets/login/wave.png";
import Tilt from "react-parallax-tilt";
// Import Recoil atom
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "src/firebase";
// import { Email, EmailRegis, Password, tokenState } from "src/recoil/initState";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/login/loginAPI";
import { RootState } from "../../redux/store";
import { loginSuccess } from "../../redux/features/login/loginSlice";
import "./style.css";

// interface MyAxiosRequestConfig {
//   withCredentials: boolean;
//   credentials: "include";
// }
const Login = () => {
  const history = useNavigate();
  // const [signIn, toggle] = React.useState(true);
  // const [emailRecoil, setEmailRecoil] = useRecoilState(Email);
  // const [emailRegisRecoil, setEmailRegisRecoil] = useRecoilState(EmailRegis);
  // const [passwordRecoil, setPasswordRecoil] = useRecoilState(Password);

  // Register
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [comFirmPassword, setComFirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error1, setError] = useState(null);
  useEffect(() => {}, [isLoading]);

  // const [, setToken] = useRecoilState(tokenState);
  // const token1 = useRecoilValue(tokenState);
  // const handleRegister = async () => {
  //   try {
  //     if (password1 === comFirmPassword) {
  //       const data = {
  //         email: email,
  //         password: password1,
  //       };

  //       fetch(API.REGISTER, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Đặt cookie vào header
  //           // Cookie: cookieJar.getCookieStringSync(API.REGISTER),
  //         },
  //         body: JSON.stringify(data),

  //         credentials: "include",
  //       })
  //         .then((response) => {
  //           // Xử lý cookie từ response nếu cần thiết
  //           console.log(response);
  //           const cookies = response.headers.get("set-cookie");

  //           return response.json();
  //         })
  //         .then((data) => {
  //           console.log(data);
  //         })
  //         .catch((error) => {
  //           // Xử lý lỗi ở đâ
  //         });
  //       setEmailRegisRecoil(email);
  //       navigate("/verify");
  //     }
  //   } catch (error) {
  //     console.error("Login failed", error);
  //   }
  // };
  // Login

  // const [emailLogin, setEmailLgoin] = useState("");
  // const [passwordLogin, setPasswordLogin] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  useEffect(() => {}, [currentUser]);
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const data = {
        email: email,
        password: password1,
      };

      login(dispatch, data);
      console.log(currentUser);
      setIsLoading(false);
      // setIsLoading(false); // Kết thúc trạng thái loading
      // setError(null);
      // const response = await axios.post(API.LOGIN, data);

      // setEmailRecoil(email);
      // setPasswordRecoil(password1);
      // const token = response.data.data.data.jwtToken;

      // // Save token to localStorage
      // localStorage.setItem("token", token);

      // Update Recoil atom with token
      // setToken(token);

      //
      // const base64UrlDecode = (base64Url: any) => {
      //   const base64 = base64Url.replace("-", "+").replace("_", "/");
      //   return atob(base64);
      // };

      // const decodeToken = (token: any) => {
      //   const [header, payload, signature] = token.split(".");
      //   const decodedHeader = JSON.parse(base64UrlDecode(header));
      //   const decodedPayload = JSON.parse(base64UrlDecode(payload));

      //   return {
      //     header: decodedHeader,
      //     payload: decodedPayload,
      //     signature: signature,
      //   };
      // };
      // const tokenDecode = localStorage.getItem("token");
      // const idToken = decodeToken(tokenDecode);
      // const id = idToken.payload.id;
      // console.log(id);

      // if (response.data.data.data.hasInfor === false) {
      //   navigate("/info");
      // } else {
      //   const password = "123456";
      //   // Hàm callback sẽ được gọi sau khi setPassword hoàn tất
      //   await signInWithEmailAndPassword(auth, email, password);
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const [trans, setTrans] = useState(true);

  return (
    <>
      <img
        src={ImgWa}
        className="fixed hidden lg:block inset-0 h-full zIndex-[-1]"
      />

      <div className="w-[auto] h-[100vh] flex flex-col justify-around items-center lg:grid lg:grid-cols-2">
        <div className="">
          <button
            className="button w-[50%] mb-[200px]"
            data-text="Awesome"
            onClick={() => setTrans(!trans)}
          >
            <span className="actual-text">
              {trans ? "Đăng nhập" : "Đăng ký"}
            </span>
            <span aria-hidden="true" className="hover-text">
              {trans ? "Đăng ký" : "Đăng nhập"}
            </span>
          </button>
        </div>
        <>
          {trans ? (
            <form className="flex flex-col justify-center items-center w-1/2 border-[1px] border-[#F9A826] border-solid p-8 rounded-lg">
              <img src={ImgAv} className="w-32" />
              <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
                Welcome to you
              </h2>
              <div className="relative">
                <i className="fa fa-user absolute text-[#F9A826] text-xl"></i>
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-8 border-b-2 font-display outline-none focus:border-[#F9A826] transition-all duration-500  text-lg rounded-sm p-1"
                />
              </div>
              <div className="relative mt-8">
                <i className="fa fa-lock absolute text-[#F9A826] text-xl"></i>
                <input
                  type="password"
                  placeholder="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 border-b-2 font-display outline-none focus:border-[#F9A826] transition-all duration-500 capitalize text-lg rounded-sm p-1"
                />
              </div>
              <button
                onClick={() => navigate("/fgpw")}
                className="self-end mt-4 text-gray-600 font-bold"
              >
                Forgot password?
              </button>
              <button
                onClick={handleLogin}
                disabled={isFetching}
                className="py-3 px-20 bg-[#F9A826] rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
              >
                {isLoading ? <div className="loader"></div> : "Login"}
              </button>
            </form>
          ) : (
            <form className="flex flex-col justify-center items-center w-1/2 border-[1px] border-[#F9A826] border-solid p-8 rounded-lg">
              <img src={ImgAv} className="w-32" />
              <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">
                Welcome to you
              </h2>
              <div className="relative">
                <i className="fa fa-user absolute text-[#F9A826] text-xl"></i>
                <input
                  type="text"
                  placeholder="username"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-8 border-b-2 font-display outline-none focus:border-[#F9A826] transition-all duration-500 capitalize text-lg rounded-sm p-1"
                />
              </div>
              <div className="relative mt-8">
                <i className="fa fa-lock absolute text-[#F9A826] text-xl"></i>
                <input
                  type="password"
                  required
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 border-b-2 font-display outline-none focus:border-[#F9A826] transition-all duration-500 capitalize text-lg rounded-sm p-1"
                />
              </div>
              <div className="relative mt-8">
                <i className="fa fa-lock absolute text-[#F9A826] text-xl"></i>
                <input
                  type="password"
                  placeholder="Comfirm password"
                  onChange={(e) => setComFirmPassword(e.target.value)}
                  required
                  className="pl-8 border-b-2 font-display outline-none focus:border-[#F9A826] transition-all duration-500 capitalize text-lg rounded-sm p-1"
                />
              </div>

              <button
                // onClick={handleRegister}
                className="py-3 px-20 bg-[#F9A826] rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
              >
                Register
              </button>
            </form>
          )}
        </>
      </div>
    </>
  );
};

export default Login;
