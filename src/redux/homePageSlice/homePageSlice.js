import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
// First, create the thunk

const initialState = {
  isLoading: false,
  homeData: [],
  errorMessage: "",
};

export const fetchHomeVideoList = createAsyncThunk(
  "homepage/fetchHomeVideoList",
  async ({ categoryID }, thunkApi) => {
    try {
      const videoRes = await api.get(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=us${categoryID !== null ? `&videoCategoryId=${categoryID}` : ``}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const videosData = videoRes.data.items; //khai báo biến để sau này tham chiếu
      const channelIds = videosData
        .map((v) => {
          return v.snippet.channelId;
        })
        .join(",");
      //Goi API Channel
      const channelRes = await api.get(
        `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      const channelData = channelRes.data.items;
      //Merge Data
      const mergeData = videosData.map((v) => {
        const channel = channelData.find((c) => c.id === v.snippet.channelId);
        return {
          ...v,
          channelProfile: channel.snippet.thumbnails.default.url,
        };
      });
      return mergeData;
    } catch (error) {
      //error.response.data.error.message;
      const errorMessage = error.message || "Cannot load homepage video";
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchHomeVideoList.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.homeData = {};
      state.errorMessage = "";
    });
    builder.addCase(fetchHomeVideoList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.homeData = action.payload;
      state.errorMessage = "";
    });
    builder.addCase(fetchHomeVideoList.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.homeData = {};
      state.errorMessage = action.payload;
    });
  },
});
export default homePageSlice.reducer;
