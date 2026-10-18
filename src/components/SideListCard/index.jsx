import React from "react";
import { Link } from "react-router";
import { convertDate } from "../../utils/function";

const SideListCard = ({activityData}) => {
  console.log(activityData);
  
  return (
    <Link to={`/video/${activityData.contentDetails?.playlistItem?.resourceId?.videoId || activityData.contentDetails.upload.videoId}`} className="flex gap-6">
      <div className="w-[50%]">
        <img src={activityData.snippet.thumbnails.default.url} className="w-full rounded-md"/>
      </div>
      <div>
        <h3>{activityData.snippet.title}</h3>
        <p>{activityData.snippet.channelTitle}</p>
        <div className="flex gap-1">
          <span>{activityData.snippet.channelTitle}</span>
          <span>.</span>
          <span>{convertDate(activityData.snippet.publishedAt)}</span>
        </div>
      </div>
      
    </Link>
  );
};

export default SideListCard;
