import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
// First, create the thunk
export const fetchChannelList = createAsyncThunk(
  "homepage/fetchChannelList",
  async (channelIdString) => {
    const response = await api.get(
      `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIdString}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    return response.data;
  }
);
const initialState = {
  isLoading: false,
  channelData: {},
  isError: false,
};
const channelInfoSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchChannelList.pending, (state) => {
      // Add user to the state array
      state.isLoading = true;
      state.channelData = {};
      state.isError = false;
    });
    builder.addCase(fetchChannelList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.channelData = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchChannelList.rejected, (state) => {
      // Add user to the state array
      state.isLoading = false;
      state.channelData = {};
      state.isError = true;
    });
  },
});
export default channelInfoSlice.reducer;
