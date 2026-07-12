import React, { useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeVideoList } from "../../redux/homePageSlice/homePageSlice";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import Spinner from "../Spinner";
import { useOutletContext } from "react-router";

const CardList = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.homePage.homeData);
  const homeDataLoading = useSelector((state) => state.homePage.isLoading);
  const homeDataError = useSelector((state) => state.homePage.errorMessage);
  const channelData = useSelector((state) => state.channelInfo.channelData);
  const channelDataLoading = useSelector(
    (state) => state.channelInfo.isLoading,
  );
  const { categoryID } = useOutletContext();
  const channelString = homeData.items
    ?.map((video) => {
      return video.snippet.channelId;
    })
    .join(",");
  useEffect(() => {
    dispatch(fetchHomeVideoList({categoryID}));
  }, [categoryID]);
  useEffect(() => {
    dispatch(fetchChannelList(channelString));
  }, [channelString]);
  // console.log("check video data :", homeData);
  // console.log("check channel data :", channelData);

  const mergedData =
    channelData.items &&
    homeData.items?.map((video) => {
      const foundChannel = channelData.items.find(
        (channel) => channel?.id === video?.snippet?.channelId,
      );
      if (foundChannel) {
        return {
          ...video,
          channelThumbnail: foundChannel.snippet.thumbnails.default.url,
        };
      }
    });

  console.log(categoryID);
  if(homeDataError){
    return <div className="text-red-500 font-bold text-center">{homeDataError}</div>
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-5 mt-12 pb-28">
        {homeDataLoading || channelDataLoading ? (
          <Spinner />
        ) : (
          mergedData?.map((video) => {
            return <Card key={video?.id} videoData={video} />;
          })
        )}
      </div>
    </>
  );
};

export default CardList;
