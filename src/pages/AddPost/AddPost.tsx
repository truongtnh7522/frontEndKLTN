import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { tokenState } from "../../recoil/initState";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import API from "../../services/API";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile } from "react-icons/bs";
import addPosts from "../../assets/add-post.svg";
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineMicrophone } from "react-icons/hi2";
import ButtonHeader from "../../components/Button/ButtonHeader";
import Dropzone from "react-dropzone";
import Picker from "@emoji-mart/react";
import { addInfo, addPost } from "../../redux/features/Add-Post/addPostAPI";
const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleEmj, setToggleEmj] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // Biến cho formData
  const [isChecked, setIsChecked] = useState("0");
  const [Content, setContent] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [File, setSelectedFile] = useState<File | null>(null);
  const [VideoFile, setVideoFile] = useState<File | null>(null);
  const handleVoiceClick = () => {
    const recognition = new ((window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognition.interimResults = true;

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");
      setContent(transcript);
    });

    recognition.start();
  };
  const addEmoji = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setContent(Content + emoji);
  };
  //
  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("Content", Content);

      if (File) {
        console.log("Img: ", formData.append("File", File));
        formData.append("File", File);
      }

      if (File) {
        formData.append("VideoFile", File); // Ensure the file name is provided
      }
      console.log(File, VideoFile);

      console.log(formData);

      await api
        .post("https://www.socialnetwork.somee.com/api/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setContent("");
            setSelectedFile(null);
            setIsImage(false);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(12);
    }
  };
  // const handlePost = async () => {
  //   setIsLoading(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("Content", Content);
  //     formData.append("LevelVieW", isChecked);
  //     console.log(File);
  //     if (File) {
  //       console.log("Img: ", formData.append("File", File));
  //       formData.append("File", File);
  //     }

  //     if (File) {
  //       formData.append("VideoFile", File); // Ensure the file name is provided
  //     }
  //     addPost(dispatch, formData);
  //   } catch (error) {
  //     console.error("Add sai!", error);
  //   }
  // };
  return (
    <>
      <div className="flex flex-row">
        <div className="  overflow-y-auto ">
          <div className="w-[80vw] py-6 pl-[150px]">
            <div className="flex justify-between">
              <div className=" flex justify-start items-center">
                <img src={addPosts} alt="" />
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    lineHeight: "140%",
                    letterSpacing: "-0.05em",
                    color: "#456fe6",
                    marginLeft: "10px",
                  }}
                >
                  Create Post
                </h2>
              </div>
              <div className="flex justify-start items-center">
                <div className="radio-inputs">
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setIsChecked("0")}
                      checked={isChecked === "0"}
                    />
                    <span className="name">Công khai</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="radio"
                      onChange={() => setIsChecked("1")}
                      checked={isChecked === "1"}
                    />
                    <span className="name">Bạn bè</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-[25px] " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium">Caption</label>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={Content}
                className="w-[100%]  h-[80px] mt-2 rounded-md  outline-[#6eb7ed] px-6 py-1"
                //   onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-end items-center">
              {" "}
              <div
                onClick={() => setToggleEmj(!toggleEmj)}
                className="cursor-pointer mr-2 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
              >
                {" "}
                <BsEmojiSmile />
              </div>
              <div
                className="cursor-pointer mr-2 bg-white p-2 rounded-[50%] hover:bg-[#456fe6] hover:text-white duration-500"
                onClick={handleVoiceClick}
              >
                <HiOutlineMicrophone />{" "}
              </div>
            </div>
            <div className="mt-[22px] " style={{ textAlign: "left" }}>
              <label className="text-[#456fe6] font-medium">Add Post</label>
              <div>
                <Dropzone
                  multiple={false}
                  onDrop={(acceptedFiles: any) => {
                    const file = acceptedFiles[0];
                    if (file.type.startsWith("image/")) {
                      setSelectedFile(file); // Handle image files
                      //    setVideoFile(null);
                    } else if (file.type.startsWith("video/")) {
                      // setVideoFile(file); // Handle video files
                      setSelectedFile(file);
                    }
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div>
                      <div
                        {...getRootProps()}
                        // border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        width="100%"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!File && !VideoFile ? (
                          <label
                            for="file"
                            class="custum-file-upload w-[100%]  h-[320px]"
                          >
                            <div className="icon">
                              <svg
                                viewBox="0 0 24 24"
                                fill=""
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g
                                  id="SVGRepo_tracerCarrier"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                  {" "}
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                    fill=""
                                  ></path>{" "}
                                </g>
                              </svg>
                            </div>
                            <div className="text">
                              <span>Click to upload image</span>
                            </div>
                            {/* <input id="file" type="file" /> */}
                          </label>
                        ) : (
                          <div>
                            {File && (
                              <>
                                <label
                                  for="file"
                                  class="custum-file-upload w-[100%]  h-[320px]"
                                >
                                  <img
                                    src={URL.createObjectURL(File)}
                                    alt="Uploaded Image"
                                    className="max-w-[200px] max-h-[200px] rounded-[10px]"
                                  />
                                  <p>{File.name}</p>
                                  {/* <input id="file" type="file" /> */}
                                </label>
                              </>
                            )}
                            {VideoFile && (
                              <>
                                <video width="100" controls>
                                  <source
                                    src={URL.createObjectURL(VideoFile)}
                                    type={VideoFile.type}
                                  />
                                </video>
                                <p>{VideoFile.name}</p>
                              </>
                            )}
                            {/* <EditOutlined /> */}
                          </div>
                        )}
                      </div>
                      {/* {(File || VideoFile) && (
                    <IconButton
                      onClick={() => {
                        setSelectedFile(null);
                        setVideoFile(null);
                      }}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )} */}
                    </div>
                  )}
                </Dropzone>
              </div>
              <label for="file" class="custum-file-upload w-[100%]  h-[320px]">
                <div className="icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                        fill=""
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <div className="text">
                  <span>Click to upload image</span>
                </div>
                <input id="file" type="file" />
              </label>
            </div>
            <div className="mt-[30px] flex justify-end items-center">
              <button className="buttonAddP1 py-[18px] bg-red">
                <MdOutlineClose />
                <span>Cancle</span>
              </button>
              <button className="buttonAddP ml-2" onClick={handlePost}>
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full h-[100px]"
        style={{ display: toggleEmj ? "none" : "block" }}
      >
        <div className="emoji">
          <Picker onEmojiSelect={addEmoji} />
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AddPost;
