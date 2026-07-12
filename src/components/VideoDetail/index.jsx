import React from "react";
import VideoPlay from "../VideoPlay";
import SideList from "../SideList";

const VideoDetails = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="w-full lg:w-[75%]">
        <VideoPlay></VideoPlay>
      </div>
      <div className="min-w-[30%]">
        <SideList></SideList>
      </div>
    </div>
  );
};

export default VideoDetails;
