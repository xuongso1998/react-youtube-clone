import React from "react";
import { convertDate, convertDuration } from "../../utils/function";
import { Link } from "react-router";
import { List } from "lucide-react";

const Card = ({ videoData, isChannel, isPlaylist }) => {
  const videoID = videoData?.contentDetails?.upload?.videoId  

  
  return (
    <Link to={isPlaylist ? `/playlist/${videoData?.id}` : `/video/${videoID || videoData?.id}`}>
      <div className="">
        <div className="relative rounded-md overflow-hidden cursor-pointer aspect-video">
          <img
            src={videoData?.snippet?.thumbnails?.high?.url}
            className="w-full h-full object-cover bg-slate-500 hover:scale-105 transition-transform "
          ></img>
          {isPlaylist ? (
            <span className="p-1 rounded-lg bg-[#0c0c0c] absolute top-auto left-auto bottom-1 right-1 flex gap-1 items-center">
              <span>
                <List />
              </span>
              <span>{videoData?.contentDetails?.itemCount} videos</span>
            </span>
          ) : (
            <span className="p-1 rounded-lg bg-[#0c0c0c] absolute top-auto left-auto bottom-1 right-1 flex gap-1 items-center">
              {convertDuration(videoData?.contentDetails?.duration)}
            </span>
          )}
        </div>
        <div className="mt-12 flex gap-4">
          {!isChannel && (
            <img
              src={videoData?.channelThumbnail}
              className="w-14 h-14 mt-2 bg-slate-200 rounded-full flex-none"
            ></img>
          )}
          {!isChannel ? (
            <div>
              <h2 className="text-xl">
                {videoData?.snippet?.localized?.title}
              </h2>
              <p className="text-lg my-2">{videoData?.snippet?.channelTitle}</p>
              <div className="flex gap-1">
                <p>
                  <span>{videoData?.statistics?.viewCount}</span> views
                </p>
                <span>.</span>
                <p>{convertDate(videoData?.snippet?.publishedAt)}</p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl">
                {videoData?.snippet?.title}
              </h2>
              {!isPlaylist && (
                <div className="flex gap-1">
                  <p>
                    <span>{videoData?.statistics?.viewCount}</span> views
                  </p>
                  <span>.</span>
                  <p>{convertDate(videoData?.snippet?.publishedAt)}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
