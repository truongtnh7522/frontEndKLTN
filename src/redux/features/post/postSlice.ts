import { createAsyncThunk, createSlice , PayloadAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import getPost from "./getPostAPI";
interface PostState {
  post: any; // Kiểu dữ liệu của info
  isLoading: boolean;
  isError: boolean;
  error: string;
  reloadTrigger: boolean, 
}
const initialState: PostState = {
  post: [],
  isLoading: false,
  isError: false,
  error: "",
  reloadTrigger: false, 
};

// async thunk
export const fetchPost = createAsyncThunk("post/fetchInfo", async () => {
  const post = await getPost();

  return post;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reloadPost: (state) => {
      state.reloadTrigger = !state.reloadTrigger;
    },
  }, // Thêm reducers nếu cần
  extraReducers: (builder: ActionReducerMapBuilder<PostState>) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.post =  [];
      })
      .addCase(fetchPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => { // Kiểu dữ liệu của action được xác định tự động
        state.isLoading = false;
        state.post =  [];
        state.isError = true;
        state.error = action.error?.message || ""; // Kiểm tra action.error?.message có thể là undefined
      });
  },
});
export const { reloadPost } = postSlice.actions;
export default postSlice.reducer;
