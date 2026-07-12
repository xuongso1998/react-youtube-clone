import React, { useEffect, useState } from "react";
import PlaylistCard from "../PlaylistCard";
import { useParams } from "react-router";
import api from "../../apis";

const Playlist = () => {
  const [playlist, setPlaylist] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const params = useParams();

  const fetchPlaylistInfo = async () => {
    const response = await api.get(
      `playlists?part=snippet%2CcontentDetails&id=${params.id}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );
    setPlaylist(response.data.items[0]);
  };

  const fetchPlaylistItems = async () => {
    const response = await api.get(
      `playlistItems?part=snippet%2CcontentDetails&maxResults=8&playlistId=${
        params.id
      }&key=${import.meta.env.VITE_YOUTUBE_API_KEY} `
    );
    setPlaylistItems(response.data.items);
    // console.log(response.data.items);
  };

  useEffect(() => {
    fetchPlaylistInfo();
    fetchPlaylistItems();
  }, []);

  return (
    <div>
      <div className="bg-gray-200/20 p-4 flex flex-col md:flex-row gap-10 rounded-md">
        <div className="w-full lg:w-[30%] aspect-video rounded-md overflow-hidden flex-child bg-slate-500">
          <img
            src={playlist?.snippet?.thumbnails?.high?.url}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-[70%] flex flex-col gap-4">
          <h3 className="text-4xl font-bold">{playlist?.snippet?.title}</h3>
          <p>{playlist?.snippet?.description}</p>
        </div>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {playlistItems.length > 0 &&
          playlistItems.map((item) => {
            return <PlaylistCard videoData={item} key={item?.id}/>;
          })}
      </div>
    </div>
  );
};

export default Playlist;
