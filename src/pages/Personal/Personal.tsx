import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CiMap } from "react-icons/ci";
import CustomVideo from "../../components/CustomVideo/CustomVideo";
import { fetchInfo } from "../../redux/features/info/infoSlice";
import Logo2 from "../../assets/LogoLoad.png";
// import { Skeleton } from "react-loading-skeleton";

interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: any;
  islike: boolean;
  videos: { link: string; createDate: string }[]; //
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Personal = () => {
  const token = useRecoilValue(tokenState);

  const [loadData, setLoadData] = useState(false);
  const [lengthFriend, setLengthFriend] = useState(0);
  const [lengthPost, setLengthPost] = useState(0);
  const [dataPost, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInfo());
  }, []);
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  console.log(info);

  const loadDataFriend = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(
        `https://www.socialnetwork.somee.com/api/Friend/getAll`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLengthFriend(response.data.data.length);
          //setLoadData(true);
          console.log(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const id = info.data.userId;
        const response = await api.get<ResponseData>(
          `https://www.socialnetwork.somee.com/api/post/user/${id}`
        );
        console.log(response);
        setLengthPost(response.data.data.length);
        // setTotal(response.data.data.length);
        setData(response.data);
        setLoadData(true);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    loadDataFriend();
  }, []);
  return (
    <>
      <div className="insta-clone">
        {/* <!--body start-->
    <!--profile data--> */}
        <div className=" h-auto px-48">
          <div className="flex md:flex-row-reverse flex-wrap">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                {loadData == false ? (
                  <Skeleton className="h-[20px] w-[80px] mr-2" />
                ) : (
                  <span className="text-base text-gray-700 text-2xl mr-2">
                    {info.data.nickname || "User"}
                  </span>
                )}

                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[40px] w-[90px] mr-2" />
                  ) : (
                    <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                      Edit Profile
                    </button>
                  )}
                </span>
                <span className="text-base font-semibold text-gray-700">
                  <button
                    className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </span>
              </div>

              <div className="text-left pl-4 pt-3 flex">
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>{lengthPost} post</b>
                  )}
                </span>
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>{lengthFriend} friends</b>
                  )}
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[50px] " />
                ) : (
                  <span className="text-lg font-bold text-gray-700 mr-2">
                    {info.data.fullName || "User"}
                  </span>
                )}
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[90px] " />
                ) : (
                  <p className="text-base font-medium text-blue-700 mr-2">
                    #{info.data.career || "User"}
                  </p>
                )}
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[600px] " />
                ) : (
                  <div className="flex items-center">
                    <CiMap />
                    <p className="text-base font-medium text-gray-700 mr-2 ml-2">
                      {info.data.address || "User"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/4 p-4 text-center">
              <div className="w-full relative text-center mt-8">
                <button
                  className="flex rounded-full"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  {loadData == false ? (
                    <Skeleton className="h-40 w-40 rounded-full" />
                  ) : (
                    <img
                      className="h-40 w-40 rounded-full"
                      src={info.data.image || Logo2}
                      alt="avatart"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* 
      <!--status show icon--> */}

          {/* <div className="inline-flex ml-36 mt-16">
            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Fun
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Travel
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Food
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Sketch
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                My Work
              </h1>
            </div>
          </div> */}

          {/* <hr className="border-gray-500 mt-6" /> */}
          <hr className="border-gray-500 w-20 border-t-1 ml-64 border-gray-800" />

          {/* <!--post icon and title--> */}
          <div className="flex flex-row mt-4 justify-center mr-16">
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-bold text-gray-800 mr-2">POSTS</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">IGTV</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  SAVED
                </h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  TAGGED
                </h3>
              </div>
            </div>
          </div>

          {/* <!--post images--> */}

          <div className="flex pt-4">
            {loadData == false ? (
              <div className="flex">
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
              </div>
            ) : (
              <>
                {dataPost.data.map((item: Comment, index: number) => (
                  <div className="flex-1 text-center px-4 py-2 m-2">
                    {item.images.length > 0 ? (
                      <img
                        className="w-full"
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].linkImage
                            : ""
                        }
                      />
                    ) : (
                      <div className="custom-video-container">
                        <video
                          src={
                            item.videos && item.videos.length > 0
                              ? item.videos[0].link
                              : ""
                          }
                          className="custom-video"
                        />
                        <button className="buttonVideo play-pause-button">
                          <svg
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            width="26px"
                          >
                            <path
                              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Personal;
