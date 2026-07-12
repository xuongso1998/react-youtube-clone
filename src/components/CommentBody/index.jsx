import { ThumbsUp } from "lucide-react";
import CommentItem from "../CommentItem";
import { useState } from "react";

const CommentBody = ({ commentData }) => {
  // console.log(commentData?.snippet?.totalReplyCount > 0 && commentData)
  // console.log(commentData);

  const [showComments, setShowComments] = useState(false);

  return (
    <div className="flex flex-col">
      <CommentItem commentData={commentData} />
      <div className="pl-12">
        {showComments && (
          <>
            {commentData?.replies?.comments.length > 0 &&
              commentData?.replies?.comments.map((comment) => {
                return <CommentItem key={comment.id} commentData={comment} />;
              })}
          </>
        )}
        {commentData.snippet.totalReplyCount > 0 && (
          <button className="mt-3 font-bold" onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide" : commentData.snippet.totalReplyCount} Replies
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentBody;
