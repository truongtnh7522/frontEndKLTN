import API from "../../../services/API";
import { api, setAuthToken } from "../../../utils/setAuthToken";
const getPost = async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const response = await api.get(API.GET_ALL_POST);
  return response.data;
};

export default getPost;
