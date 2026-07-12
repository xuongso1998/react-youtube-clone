import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
// First, create the thunk
export const fetchVideoDetailData = createAsyncThunk(
  "watchpage/fetchVideoDetailData",
  async (videoId) => {
    const response = await api.get(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    return response.data;
  }
);
const initialState = {
  isLoading: false,
  videoDetailData: {},
  isError: false,
};
const watchPageSlice = createSlice({
  name: "watchPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchVideoDetailData.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.videoDetailData = {};
      state.isError = false;
    });
    builder.addCase(fetchVideoDetailData.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.videoDetailData = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchVideoDetailData.rejected, (state) => {
      // Add user to the state array
      state.isLoading = false;
      state.videoDetailData = {};
      state.isError = true;
    });
  },
});
export default watchPageSlice.reducer;
