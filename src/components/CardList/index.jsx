import React, { useEffect } from "react";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeVideoList } from "../../redux/homePageSlice/homePageSlice";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import Spinner from "../Spinner";
import { useOutletContext } from "react-router";

const CardList = () => {
  const dispatch = useDispatch();
  const homepageData = useSelector((state) => state.homePage.homeData);
  const { categoryID } = useOutletContext();
  useEffect(() => {
    dispatch(fetchHomeVideoList({ categoryID }));
  }, []);

  console.log(homepageData);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-5 mt-12 pb-28">
        {homepageData.map((video) => {
          return <Card videoData={video} />;
        })}
      </div>
    </>
  );
};

export default CardList;
