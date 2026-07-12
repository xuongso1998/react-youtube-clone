import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from "./homePageSlice/homePageSlice"
import channelInfoReducer from "./channelInfoSlice/channelInfoSlice"
import watchPageReducer from "./watchPageSlice/watchPageSlice"

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    channelInfo: channelInfoReducer,
    watchPage: watchPageReducer
  },
})
