import React, { useEffect } from "react";
import SideListCard from "../SideListCard";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoDetailData } from "../../redux/watchPageSlice/watchPageSlice";
import { fetchActivitiesList } from "../../redux/activitiesSlice/activitiesSlice";
import Spinner from "../Spinner";

const SideList = () => {
  const params = useParams();
  // console.log(params);
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.watchPage.videoDetailData);
  const channelId = videoData.snippet?.channelId;
  const activitiesData = useSelector((state) => state.activity.activitiesData);
  const activtiesLoading = useSelector((state) => state.activity.isLoading)

  useEffect(() => {
    dispatch(fetchVideoDetailData(params.id));
  }, []);
  useEffect(() => {
    dispatch(fetchActivitiesList({ params: { id: channelId } }));
  }, [videoData]);

  return (
    <div className="flex flex-col gap-4">
      {activtiesLoading && <Spinner/>}
      {activitiesData.map((activity)=> {
        return <SideListCard activityData={activity}/>
      })}
    </div>
  );
};

export default SideList;
