import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
// First, create the thunk
export const fetchHomeVideoList = createAsyncThunk(
  "homepage/fetchHomeVideoList",
  async ({categoryID}, thunkApi) => {
    try {
      const response = await api.get(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=us${categoryID !== null ? `&videoCategoryId=${categoryID}` : ``}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    return response.data;
    } catch (error) {
      //error.response.data.error.message;
      const errorMessage = error.message || "Cannot load homepage video";
      return thunkApi.rejectWithValue(errorMessage)
    }
  }
);
const initialState = {
  isLoading: false,
  homeData: {},
  errorMessage: "",
};
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
export default homePageSlice.reducer