import React, { useEffect, useState } from "react";
import ImageMain2 from "../../assets/login/ImgMain.png";
import "./style.css";
import type { RadioChangeEvent, DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import { Radio } from "antd";
// import { UserId } from "../../utils/getUserIdd";
import { useDispatch, useSelector } from "react-redux";
import { addInfo } from "../../redux/features/Add-Info/addInfoAPI";
import { useNavigate } from "react-router";
import { RootState } from "../../redux/store";
import toast, { Toaster } from "react-hot-toast";
const AddInfo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "true") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      navigate("/");
    }
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [FullName, setFullName] = useState("");
  const [WorkPlace, setWorkPlace] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [File, setSelectedFile] = useState<File | null>(null);
  const [Gender, setGender] = useState(false);
  const [value, setValue] = useState(false);
  const [Address, setAddress] = useState("");
  const dispatch = useDispatch();
  // const onHandleFormSubmit = (data: TFormValues) => {
  //   onHandleNext();
  // };
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateOfBirth(dateString);
    console.log(date, dateString);
  };

  const onChangeR = (e: RadioChangeEvent) => {
    setGender(e.target.value);
    setValue(e.target.value);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const base64UrlDecode = (base64Url: any) => {
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return atob(base64);
  };

  const decodeToken = (token: any) => {
    const [header, payload, signature] = token.split(".");
    const decodedHeader = JSON.parse(base64UrlDecode(header));
    const decodedPayload = JSON.parse(base64UrlDecode(payload));

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: signature,
    };
  };
  const tokenDecode = localStorage.getItem("token") || "";
  const idToken = decodeToken(tokenDecode);
  const UserId = idToken.payload.id;
  //
  const handleLUpdate = async () => {
    setIsLoading(true);
    try {
      if (File) {
        // Tạo formData để chứa dữ liệu và file
        const File1 = new FormData();
        File1.append("File", File);
        const data = {
          UserId: UserId,
          FullName: FullName,
          WorkPlace: WorkPlace,
          Gender: Gender,
          PhoneNumber: PhoneNumber,
          File: File,
          Address: Address,
          DateOfBirth: DateOfBirth,
        };
        addInfo(dispatch, data);
      }
    } catch (error) {
      console.error("Add sai!", error);
    }
  };
  //

  const error = useSelector((state) => state.addInfo.error);
  const dataAddInfo = useSelector(
    (state: RootState) => state.addInfo.dataAddInfo
  );
  const isFetching = useSelector(
    (state: RootState) => state.addInfo.isFetching
  );
  useEffect(() => {
    if (dataAddInfo?.data.success === true) {
      toast.success("Thêm thông tin thành công!");
      console.log(dataAddInfo);
      localStorage.setItem("hasInfor", "true");
      setTimeout(() => {
        toast.dismiss(); // Ẩn toast

        navigate("/");
      }, 1000);
    }
    if (error == true && isFetching == false) {
      setIsLoading(false);
      console.log(error);
      toast.error("Thêm thông tin thất bại!");
    }
  }, [dataAddInfo, error, isFetching]);
  return (
    <div className=" w-[100vw] bg-[#e2e8f0] h-[100vh] flex justify-center items-center">
      <div className=" h-[90%] w-[65%] flex ">
        <form className="flex flex-col bg-white  p-4 shadow-sm h-[100%] w-[70%] rounded-l-[10px]">
          <h2 className="text-[#56fe6] font-bold text-[30px]">
            Add Information
          </h2>
          <div className="w-full  py-1 mt-3 flex px-[20px] justify-start items-center">
            <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
              1
            </p>
            <p className="text-black font-bold">Personal Information</p>
          </div>
          <div className="mt-4 flex justify-around">
            <div>
              <label className="text-gray-600 text-sm">Name</label>
              <input
                placeholder="Your name"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px] outline-[#6eb7ed] px-2 py-1"
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm">WorkPlace</label>
              <input
                placeholder="Your WorkPlace"
                className="w-full  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
                type="text"
                onChange={(e) => setWorkPlace(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-around">
            <div className=" max-w-[350px]">
              <label htmlFor="buttondisplay" className="text-gray-600 text-sm">
                Date
              </label>
              <DatePicker
                onChange={onChange}
                placeholder="Birth Day"
                className="w-full pl-[4.5rem] pr-6  rounded-md border-[#cdcdcd] border-solid border-[1px]  outline-[#6eb7ed] px-2 py-1"
              />
            </div>
            <div className="bg-white  rounded-lg max-w-[350px]">
              <label className="text-gray-600 text-sm">Phone number</label>
              <div className="relative max-w-xs text-gray-500">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2 ">
                  <select className="text-sm outline-none rounded-lg h-full">
                    <option>US</option>
                    <option>ES</option>
                    <option>MR</option>
                  </select>
                </div>
                <input
                  type="number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  min={0}
                  placeholder="+1 (555) 000-000"
                  className="w-full pl-[4rem] pr-3 py-1 appearance-none bg-transparent outline-none border focus:border-[#6eb7ed] shadow-sm rounded-md "
                />
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="">
              <div className="w-full  py-1 mt-6 flex px-[20px] justify-start items-center">
                <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
                  2
                </p>
                <p className="text-black font-bold">Avatar User</p>
              </div>

              <form className="file-upload-form mt-2 pl-6">
                <label for="file" className="file-upload-label">
                  <div className="file-upload-design">
                    <div className="loader1"></div>
                  </div>
                  <input id="file" type="file" onChange={handleFileChange} />
                </label>
              </form>
            </div>
            <div className="ml-[160px]">
              <div className="w-full  py-1 mt-6 flex px-[20px] justify-start items-center">
                <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
                  3
                </p>
                <p className="text-black font-bold">Gender</p>
              </div>

              <Space
                direction="horizontal"
                className="my-4 w-[100%] flex justify-around mt-8 ml-[20px]"
              >
                <Radio.Group
                  onChange={onChangeR}
                  value={value}
                  className="border-solid border-[1px] border-[#b8b8b8] p-2 rounded-[10px] flex"
                >
                  <Radio value={false}>Nam</Radio>
                  <Radio value={true}>Nữ</Radio>
                </Radio.Group>
              </Space>
            </div>
          </div>
          <div className="w-full  py-1 mt-4 flex px-[20px] justify-start items-center">
            <p className="border-[1px] border-solid border-[#6eb7ed] py-[5px] px-[12px] mr-2 rounded-full font-bold text-[#6eb7ed]">
              4
            </p>
            <p className="text-black font-bold">Address Information</p>
          </div>
          <div>
            <textarea
              placeholder="Your address"
              className="w-[90%] mt-2 rounded-md border-[#cdcdcd] border-solid border-[1px] outline-[#6eb7ed] px-6 py-1"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center mt-2">
            <div
              className="button1 w-[18%] justify-center"
              onClick={handleLUpdate}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </form>
        <div className="bg-[#456fe6] h-[100%] w-[30%] rounded-r-[10px] flex justify-center items-center">
          <img src={ImageMain2} alt="" />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AddInfo;
