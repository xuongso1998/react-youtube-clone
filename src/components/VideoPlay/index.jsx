import { DivideCircle, Forward, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { fetchVideoDetailData } from "../../redux/watchPageSlice/watchPageSlice";
import Spinner from "../Spinner";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";

const VideoPlay = () => {
  const param = useParams();
  const watchPage = useSelector((state) => state.watchPage.videoDetailData);
  const isLoading = useSelector((state) => state.watchPage.isLoading);
  const isError = useSelector((state) => state.watchPage.isError);
  const dispatch = useDispatch();
  const [isShowDescription, setIsShowDescription] = useState(false);
  const videoDetails = useSelector((state) => state.watchPage.videoDetailData);
  const channelInfo = useSelector((state) => state.channelInfo.channelData);
  const videoInnerDetails = videoDetails?.items && videoDetails?.items[0];

  useEffect(() => {
    dispatch(fetchVideoDetailData(param.id));
  }, [param.id]);

  useEffect(() => {
    if (videoDetails?.items) {
      dispatch(fetchChannelList(videoDetails?.items[0]?.snippet.channelId));
    }
  }, [videoDetails?.items]);

  // console.log(channelInfo);

  return (
    <div className="mb-20">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${param.id}?autoplay=1`}
            width={"100%"}
            height={"100%"}
            className="rounded-lg aspect-video"
          ></iframe>
          <h2 className="text-2xl mt-4">{videoInnerDetails?.snippet?.title}</h2>
          <div className="flex flex-col lg:flex-row md:items-center justify-between">
            <div className="flex gap-3 mt-4">
              <Link
                to={`/channel/${
                  channelInfo?.items && channelInfo?.items[0]?.id
                }`}
              >
                <div className="w-12  h-12 rounded-full overflow-hidden">
                  <img
                    src={
                      channelInfo?.items &&
                      channelInfo?.items[0]?.snippet?.thumbnails?.default?.url
                    }
                    alt=""
                  />
                </div>
              </Link>
              <div>
                <p>
                  {channelInfo?.items && channelInfo?.items[0]?.snippet?.title}
                </p>
                <p>
                  {channelInfo?.items &&
                    channelInfo?.items[0]?.statistics?.subscriberCount}{" "}
                  Subscribers
                </p>
              </div>
            </div>
            <div className="flex flex-row content-center gap-2">
              <button className="flex flex-row gap-2 justify-center items-center px-5 py-3 bg-slate-900 rounded-[99999px]">
                <div>
                  <ThumbsUp />
                </div>
                <div>| 2.1k likes</div>
              </button>
              <button className="flex flex-row gap-2 justify-center items-center px-5 py-3 bg-slate-900 rounded-[99999px]">
                <div>
                  <Forward />
                </div>
                <div>Share</div>
              </button>
            </div>
          </div>
          <div className="bg-gray-500/50 p-4 rounded-md my-4">
            <p>38k Views 3 days ago</p>
            <p className="whitespace-pre-line">
              {isShowDescription
                ? videoInnerDetails?.snippet?.description
                : videoInnerDetails?.snippet?.description.substring(0, 101) +
                  "..."}
            </p>
            <button onClick={() => setIsShowDescription(!isShowDescription)}>
              {isShowDescription ? "Hide" : "Show more"}
            </button>
          </div>
        </>
      )}
      <Comment videoId={param.id} />
    </div>
  );
};

export default VideoPlay;
