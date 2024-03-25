import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { Skeleton } from "react-loading-skeleton";
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Personal = () => {
  const token = useRecoilValue(tokenState);
  const [fullName, setFullName] = useState("");
  const [loadInfo, setLoadInfo] = useState(true);
  const [dataCmt, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  useEffect(() => {
    console.log(isLoading, info);
  }, []);
  console.log(info);
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
                    src={info.data.image || ""}
                    alt="avatar"
                    className="h-[155px] w-[155px] rounded-[50%]"
                  />
                )}

                <div className=" ml-4 text-left flex flex-col justify-between ">
                  {loadInfo == false ? (
                    <Skeleton className="h-[15px] w-[200px] mb-2" />
                  ) : (
                    <span className="text-[30px] font-semibold ">
                      {info.data.fullName}
                    </span>
                  )}
                  {loadInfo == false ? (
                    <Skeleton className="h-[15px] w-[150px]" />
                  ) : (
                    <span className="text-[14px]  text-[#adc1fb]">
                      Làm việc tại {info.data.workPlace}
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
              <div className="flex ">
                {loadInfo == false ? (
                  <Skeleton className="h-[40px] w-[80px] ml-2" />
                ) : (
                  <button className="BtnEdit">
                    Edit
                    <svg className="svg" viewBox="0 0 512 512">
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px]"></div>
    </>
  );
};

export default Personal;
