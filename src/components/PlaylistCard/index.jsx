import React from "react";
import { Link } from "react-router";

const PlaylistCard = ({ videoData }) => {
  return (
    <Link to={`/video/${videoData?.contentDetails?.videoId}`}>
      <div className="relative mt-6">
        <div className="relative rounded-md overflow-hidden cursor-pointer">
          <img
            src={videoData?.snippet?.thumbnails?.high?.url}
            className="w-full object-cover aspect-video hover:scale-105 transition-transform "
          ></img>
          <div className="p-[32px] absolute top-0 bottom-0 left-0 flex items-center gap-4 bg-black/50">
            <p className="text-2xl">{videoData?.snippet?.position + 1}</p>
          </div>
        </div>
        <div className="mt-2 md:mt-6">
          <h2 className="text-2xl">{videoData?.snippet?.title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
