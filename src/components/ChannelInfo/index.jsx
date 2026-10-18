import React, { useEffect, useState } from "react";
import Card from "../Card";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelList } from "../../redux/channelInfoSlice/channelInfoSlice";
import api from "../../apis";
import { fetchActivitiesList } from "../../redux/activitiesSlice/activitiesSlice";

const ChannelInfo = () => {
  const [activeTab, setActiveTab] = useState("Videos");
  const dispatch = useDispatch();
  const [isShowModal, setIsShowModal] = useState(false);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const stateChannel = useSelector((state) => state.channelInfo.channelData);
  const activitiesData = useSelector((state)=> state.activity.activitiesData);
  console.log(activitiesData);
  
  const params = useParams();
  useEffect(() => {
    dispatch(fetchChannelList(params.id));
    dispatch(fetchActivitiesList({params}))
  }, [params.id]);

  const channelInfo = stateChannel?.items && stateChannel?.items[0];
 

  const fetchChannelPlaylist = async () => {
    const response = await api.get(
      `playlists?part=snippet%2CcontentDetails&channelId=${
        params.id
      }&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
    );
    // console.log(response);
    setChannelPlaylists(response.data.items)
  };

  useEffect(() => {
    fetchChannelPlaylist();
  }, []);

  return (
    <div>
      {isShowModal && (
        <div
          onClick={() => setIsShowModal(false)}
          className="fixed left-0 right-0 top-0 bottom-0 z-50 bg-black/50 flex items-center justify-center cursor-pointer"
        >
          <div className="p-4 bg-slate-700 text-white rounded-xl max-w-[500px]">
            <p>{channelInfo?.snippet?.description}</p>
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-11">
        <div className="w-60 h-60 rounded-full overflow-hidden">
          <img
            className="w-full h-full"
            src={channelInfo?.snippet?.thumbnails?.high.url}
            alt=""
          />
        </div>
        <div>
          <h1 className="text-5xl">{channelInfo?.snippet?.title}</h1>
          <div className="mt-2 flex gap-4">
            <p>{channelInfo?.snippet?.customUrl}</p>
            <p>{channelInfo?.statistics?.subscriberCount} Subscribers</p>
            <p>{channelInfo?.statistics?.videoCount} Videos</p>
          </div>
          <div className="mt-4 flex flex-col gap-10">
            <div className="flex gap-1">
              <p>
                {channelInfo?.snippet?.description.length > 60
                  ? channelInfo?.snippet?.description.substring(0, 61) + "..."
                  : channelInfo?.snippet?.description}
              </p>
              {channelInfo?.snippet?.description.length > 60 && (
                <button
                  className="font-bold"
                  onClick={() => setIsShowModal(true)}
                >
                  Show more
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-32 border-b-[1px] border-stone-600">
        <button
          className={`px-10 py-6 ${
            activeTab === "Videos" && "border-b-[1.5px] border-white"
          }`}
          onClick={() => setActiveTab("Videos")}
        >
          <span className="text-xl">Videos</span>
        </button>
        <button
          className={`px-10 py-6 ${
            activeTab === "Playlist" && "border-b-[1.5px] border-white"
          }`}
          onClick={() => setActiveTab("Playlist")}
        >
          <span className="text-xl">Playlist</span>
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeTab === "Videos" ? activitiesData.length > 0 &&
          activitiesData.map((video) => {
            return <Card key={video.id} videoData={video} isChannel={true} />;
          }): channelPlaylists.length > 0 && channelPlaylists.map((playlist) => {
            return <Card key={playlist.id} videoData={playlist} isChannel={true} isPlaylist={true}/>;
          })}
      </div>
    </div>
  );
};

export default ChannelInfo;
