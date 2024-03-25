import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getInfo = async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_MY_INFO);
  console.log
  return response.data;
};

export default getInfo;


// import API from "../../../services/API";
// import { api, setAuthToken } from "../../../utils/setAuthToken";

// const getInfo = async () => {
//   const token = localStorage.getItem("token");
//   setAuthToken(token);
//   try {
//     const response = await api.get(API.GET_MY_INFO);
//     return { data: response.data, error: null }; // Trả về dữ liệu nếu không có lỗi
//   } catch (err) {
//     return { data: null, error: err }; // Trả về lỗi nếu có lỗi
//   }
// };

// export default getInfo;
