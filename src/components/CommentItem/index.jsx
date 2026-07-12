import { ThumbsUp } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const CommentItem = ({ commentData }) => {
  // console.log(commentData);

  return (
    <div className="flex flex-row gap-4 mt-6">
      <Link
        to={`/channel/${commentData.snippet?.authorChannelId?.value || commentData.snippet.channelId}`}
        className="w-12 h-12 rounded-full bg-slate-500 overflow-hidden flex-none"
      >
        <img
          src={
            commentData?.snippet?.topLevelComment?.snippet
              .authorProfileImageUrl ||
            commentData.snippet.authorProfileImageUrl
          }
          alt=""
          className="w-full h-full object-cover"
        />
      </Link>
      <div>
        <Link
          to={`/channel/${commentData.snippet?.authorChannelId?.value || commentData.snippet.channelId}`}
        >
          <p>
            {commentData?.snippet?.topLevelComment?.snippet.authorDisplayName ||
              commentData.snippet.authorDisplayName}
          </p>
        </Link>

        <p className="break-all">
          {commentData?.snippet?.topLevelComment?.snippet.textDisplay ||
            commentData.snippet.textDisplay}
        </p>
        <div className="mt-2 flex flex-row gap-3">
          <ThumbsUp size={"18px"} />
          <span>
            {commentData?.snippet?.topLevelComment?.snippet.likeCount ||
              commentData.snippet.likeCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
