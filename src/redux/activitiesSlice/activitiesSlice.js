import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../apis";
// First, create the thunk

const initialState = {
  isLoading: false,
  activitiesData: [],
  nextPageToken: "",
  isLoadMore: false,
  errorMessage: "",
};

export const fetchActivitiesList = createAsyncThunk(
  "activity/fetchActivitiesList",
  async ({ params }, thunkApi) => {
    try {
      const activitiesRes = await api.get(
        `activities?part=snippet%2CcontentDetails&channelId=${
          params.id
        }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      // console.log(activitiesRes);
      const activitiesData = activitiesRes.data.items;
      //   data.items[0].contentDetails.playlistItem.resourceId.videoId
      const videoIds = activitiesData
        .map((a) => {
          return (
            a.contentDetails.upload?.videoId ||
            a.contentDetails.playlistItem?.resourceId?.videoId
          );
        })
        .join(",");
      const videosRes = await api.get(
        `videos?part=statistics%2CcontentDetails&id=${videoIds}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
      );
      const videoData = videosRes.data.items;
      const mergedData = activitiesData.map((a) => {
        const currentId =
          a.contentDetails.upload?.videoId ||
          a.contentDetails.playlistItem?.resourceId?.videoId;
        const matchVideo = videoData.find((v) => {
          return v.id === currentId;
        });
        return {
            ...a,
            videoContentDetails: matchVideo.contentDetails,
            statistics: matchVideo.statistics
        }
      });

      return mergedData;
    } catch (error) {
      //error.response.data.error.message;
      const errorMessage = error.message || "Cannot load homepage video";
      return thunkApi.rejectWithValue(errorMessage);
    }
  },
);

const activitiesSlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchActivitiesList.pending, (state) => {
      // Add user to the state array

      state.isLoading = true;
      state.activitiesData = [];
      state.errorMessage = "";
    });
    builder.addCase(fetchActivitiesList.fulfilled, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      console.log(action.payload);
      
      state.activitiesData = action.payload;
      //   state.nextPageToken = action.payload.nextPageToken;
      //   state.isLoadMore = false;
      state.errorMessage = "";
    });
    builder.addCase(fetchActivitiesList.rejected, (state, action) => {
      // Add user to the state array
      state.isLoading = false;
      state.activitiesData = [];
      state.errorMessage = action.payload;
    });
  },
});

export default activitiesSlice.reducer;
