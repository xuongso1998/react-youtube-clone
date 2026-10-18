import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from "./homePageSlice/homePageSlice"
import channelInfoReducer from "./channelInfoSlice/channelInfoSlice"
import watchPageReducer from "./watchPageSlice/watchPageSlice"
import activitiesReducer from "./activitiesSlice/activitiesSlice"

export const store = configureStore({
  reducer: {
    homePage: homePageReducer,
    activity: activitiesReducer,
    channelInfo: channelInfoReducer,
    watchPage: watchPageReducer
  },
})
