import React, { useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeVideoList, switchLoadMore } from "../../redux/homePageSlice/homePageSlice";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import Spinner from "../Spinner";
import { useOutletContext } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

const CardList = () => {
  const dispatch = useDispatch();
  const homepageData = useSelector((state) => state.homePage.homeData);
  const isLoading = useSelector((state) => state.homePage.isLoading);
  const errorMessage = useSelector((state) => state.homePage.errorMessage);
  const nextPageToken = useSelector((state) => state.homePage.nextPageToken);
  
  const { categoryID } = useOutletContext();
  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryID }));
  }, []);

  console.log(homepageData);
  const fetchMore = ()=>{
    dispatch(switchLoadMore(true));
    dispatch(fetchHomeVideoList({ categoryID }));
  }

  return (
    <>
      <InfiniteScroll dataLength={homepageData.length} loader={<p>Loading...</p>} next={fetchMore} hasMore={nextPageToken}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-5 mt-12 pb-28">
          {isLoading && <Spinner />}
          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
          {homepageData.map((video) => {
            return <Card videoData={video} key={video.id  }/>;
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default CardList;
