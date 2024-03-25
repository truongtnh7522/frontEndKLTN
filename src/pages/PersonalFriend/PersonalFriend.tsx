import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
// import { Skeleton } from "react-loading-skeleton";
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const PersonalFriend = () => {
  const { id } = useParams();
  console.log(id);
  const [loadInfo, setLoadCmt1] = useState(false);
  const [loadSearch, setLoadSearch] = useState(false);
  const [loadSearch1, setLoadSearch1] = useState(false);
  const [loadSearch2, setLoadSearch2] = useState(false);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });

  const loadData = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(
        `https://truongnetwwork.bsite.net/api/infor/user/${id}`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoadSearch1(false);
          setLoadSearch2(false);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleAddF = async (idfriend: any) => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/send/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        loadData();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleAcceptF = async (idfriend: any) => {
    // setLoadSearch1(true);
    // setAuthToken(token);
    try {
      const id = idfriend;
      console.log(1);
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/accept/${id}`
      );
      console.log(2);
      console.log(response);
      if (response.status == 200) {
        loadData();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleRemoveF = async (idfriend: any) => {
    setLoadSearch2(true);
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://truongnetwwork.bsite.net/api/Friend/refuseFriend/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        loadData();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const [sb, setSb] = useState(false);
  const handleConfirm = async () => {
    setAuthToken(token);
    try {
      const response = await api.delete(
        `https://truongnetwwork.bsite.net/api/Friend/unfriend/${id}`
      );
      if (response.status == 200) {
        loadData();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    // Xử lý khi nhấn xác nhận
    setSb(false);
  };

  const handleCancel = () => {
    // Xử lý khi nhấn hủy
    setSb(false);
  };
  useEffect(() => {
    loadData();
    // loadDataUserCmt();
  }, []);
  console.log(data);
  return (
    <>
      <div className="flex flex-row">
        <div className="  overflow-y-auto">
          <div className="w-[80vw] py-6   ml-[80px] px-[150px]">
            <div
              className="mt-[25px] flex justify-between items-center "
              style={{ textAlign: "left" }}
            >
              <div className="flex items-start">
                {loadInfo == false ? (
                  <Skeleton className="h-[155px] w-[155px] rounded-[50%]" />
                ) : (
                  <img
                    src={data.data?.image || ""}
                    alt="avatar"
                    className="h-[155px] w-[155px] rounded-[50%]"
                  />
                )}

                <div className=" ml-4 text-left flex flex-col justify-between ">
                  {loadInfo == false ? (
                    <Skeleton className="h-[15px] w-[200px] mb-2" />
                  ) : (
                    <div className="flex justify-center items-center">
                      <span className="text-[30px] font-semibold ">
                        {data.data.fullName}
                      </span>
                      <>
                        {data.data.statusFriend === "Thêm bạn bè" ? (
                          <>
                            {loadSearch1 == false ? (
                              <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                <button
                                  onClick={() => {
                                    handleAddF(data.data.userId);
                                  }}
                                  className="text-[15px] font-medium "
                                >
                                  Thêm bạn bè
                                </button>
                              </div>
                            ) : (
                              <div className="loaderSe"></div>
                            )}
                          </>
                        ) : data.data.statusFriend === "Phản Hồi" ? (
                          <div className="flex ">
                            <>
                              {loadSearch1 == false ? (
                                <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                  <button
                                    onClick={() => {
                                      handleAcceptF(data.data.userId);
                                    }}
                                    className="text-[15px] font-medium "
                                  >
                                    Chấp nhận
                                  </button>
                                </div>
                              ) : (
                                <div className="loaderSe"></div>
                              )}
                            </>
                            <>
                              {loadSearch2 == false ? (
                                <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                  <button
                                    onClick={() => {
                                      handleRemoveF(data.data.userId);
                                    }}
                                    className="text-[15px] font-medium "
                                  >
                                    Từ chối
                                  </button>
                                </div>
                              ) : (
                                <div className="loaderSe"></div>
                              )}
                            </>
                          </div>
                        ) : data.data.statusFriend === "Hủy lời mời" ? (
                          <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                            {" "}
                            <button className="text-[15px] font-medium ">
                              Chờ xác nhận
                            </button>
                          </div>
                        ) : (
                          <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                            <button
                              onClick={() => {
                                setSb(true);
                              }}
                              className="text-[15px] font-medium "
                            >
                              Bạn bè
                            </button>
                          </div>
                        )}
                      </>
                    </div>
                  )}
                  {loadInfo == false ? (
                    <Skeleton className="h-[15px] w-[150px]" />
                  ) : (
                    <span className="text-[14px]  text-[#adc1fb]">
                      Làm việc tại {data.data.workPlace}
                    </span>
                  )}

                  <div className="mt-6 flex">
                    {loadInfo == false ? (
                      <Skeleton className="h-[15px] w-[80px]" />
                    ) : (
                      <span className="text-[20px] font-bold ">0 bài viết</span>
                    )}
                    {loadInfo == false ? (
                      <Skeleton className="h-[15px] w-[80px] ml-2" />
                    ) : (
                      <span className="text-[20px] font-bold ml-3">
                        0 bài viết
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px]"></div>
      {sb && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "20%",
            }}
          >
            {/* Nội dung form đặt lịch */}
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25.2px",
                textAlign: "center",
                color: "#111111",
              }}
            >
              Xác nhận hủy kết bạn
            </h2>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17.64px",
                textAlign: "center",
                color: "#78828A",
              }}
            >
              Bạn có muốn chắc chắn hủy kết bạn?
            </p>
            <div
              style={{
                marginTop: "20px",
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#456fe6",
                  border: "0",
                  background: "transparent ",
                }}
              >
                Hủy
              </button>{" "}
              <button
                onClick={handleConfirm}
                style={{
                  borderRadius: "20px",
                  padding: "12px 24px 12px 24px",
                  border: 0,
                  background: "#456fe6",
                  color: "#FEFEFE",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalFriend;
