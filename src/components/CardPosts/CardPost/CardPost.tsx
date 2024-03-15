import React, { useState } from "react";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { api, setAuthToken } from "../../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { ReloadLike, tokenState } from "../../../recoil/initState";
import { useDispatch } from "react-redux";
interface Props {
  data: any;
}
const CardPost = ({ data }: Props) => {
  const [images, setImages] = useState(data.images);
  const token = useRecoilValue(tokenState);
  const [like, setLike] = useRecoilState(ReloadLike);
  const [countData, setCountData] = useState(data.countLike);
  const dispatch = useDispatch();
  const handleLike = async () => {
    setAuthToken(token);
    try {
      const id = data.id;
      console.log(123);
      await api
        .post(`https://www.socialnetwork.somee.com/api/like/${id}`)
        .then((response) => {
          // Cập nhật dữ liệu vào state
          console.log(response);
          if (response.status === 200) {
            dispatch(fetchPost());
            setLike(like + 1);
            setCountData(data.countLike + 1);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  console.log(data);
  return (
    <div className="w-[500px] h-auto bg-white  mb-10 rounded-[10px]">
      <div className="py-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={data.avatarUrl}
            alt="avatar"
            className="h-[45px] w-[45px] rounded-[50%]"
          />
          <div className=" ml-4 text-left">
            <span className="text-[18px] font-[500] ">{data.fullName}</span>
            <div className="flex justify-center items-center">
              <span className="text-light-3 text-[12px] mr-2">2 hours</span>
              <>
                {data.levelView == 1 ? (
                  <div className="text-light-3 ">
                    {" "}
                    <FaEarthAmericas />
                  </div>
                ) : (
                  <div className="text-light-3">
                    {" "}
                    <FaUserFriends />
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
        <div className="text-[25px] p-2 cursor-pointer hover:bg-[#f2f2f2] rounded-[50%] duration-500">
          <IoMdClose />
        </div>
      </div>
      <div className="pb-4 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-light-3 text-[15px] mr-2">{data.content}</span>
        </div>
      </div>
      <div>
        <div>
          <>
            {images.length === 2 ? (
              <div className="flex">
                {images?.map((index, item) => (
                  <img
                    key={index}
                    src={images[item]?.linkImage}
                    alt=""
                    className="max-h-[300px] w-[50%] mx-[2px]"
                  />
                ))}
              </div>
            ) : images.length === 3 ? (
              <div className="flex">
                {images?.map((index, item) => (
                  <img
                    key={index}
                    src={images[item]?.linkImage}
                    alt=""
                    className="max-h-[300px] w-[50%] mx-[2px]"
                  />
                ))}
              </div>
            ) : (
              <>
                {images?.map((index, item) => (
                  <img
                    key={index}
                    src={images[item]?.linkImage}
                    alt=""
                    className="w-[100%]"
                  />
                ))}
              </>
            )}
          </>
        </div>
      </div>
      <div className="px-2 py-2">
        <div className="flex justify-start items-center">
          <button className="buttonTym" onClick={handleLike}>
            {data.islike == false ? (
              <svg
                className="empty"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0H24V24H0z"></path>
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
              </svg>
            ) : (
              <svg
                className="filled"
                height="32"
                width="32"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0H24V24H0z" fill="none"></path>
                <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
              </svg>
            )}
            {data.countLike} Like
          </button>
          <button className="buttonTym ml-3">
            <div className="text-[#456fe6]">
              <IoShareSocialOutline />
            </div>{" "}
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
