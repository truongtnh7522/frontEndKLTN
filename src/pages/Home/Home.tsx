import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { tokenState } from "../../recoil/initState";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import API from "../../services/API";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Home = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    console.log(typeof hasInfor);
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      navigate("/add-info");
    }
  }, []);

  const token = useRecoilValue(tokenState);
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const response = await api.get<ResponseData>(API.GET_MY_INFO);
        console.log(response);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>ss</div>
      <Toaster />
    </>
  );
};

export default Home;
