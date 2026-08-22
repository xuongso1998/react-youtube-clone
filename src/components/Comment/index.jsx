import CommentBody from "../CommentBody";
import api from "../../apis";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

const Comment = ({ videoId }) => {
  const [commentList, setCommentList] = useState({
    data: [],
    nextPageToken: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCommentList = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${videoId}${commentList.nextPageToken ? `&pageToken=${commentList.nextPageToken}` : ""}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`,
      );
      setCommentList((prev) => {
        return {
          data: [...prev.data, ...response.data.items],
          nextPageToken: response.data.nextPageToken,
        };
      });
    } catch (error) {
      console.log(error.response);
      // setErrorMessage(error.message);
      if (error.response.status === 400){
        setErrorMessage("URL Syntax Error")
      } else if (error.response.status === 500){
        setErrorMessage("Server Error")
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  if (errorMessage !== "") {
    return (
      <div className="text-center font-bold text-red-500">{errorMessage}</div>
    );
  }
  if (isLoading) {
    return;
    <Spinner />;
  }

  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl mt-8">Comments</h3>
      </div>
      {commentList.data.length > 0 &&
        commentList.data.map((item) => {
          return <CommentBody key={item.id} commentData={item} />;
        })}
      <div className="mt-6">
        <button
          className="w-full p-2 text-center"
          onClick={() => fetchCommentList()}
        >
          Load more...
        </button>
      </div>
    </div>
  );
};

export default Comment;
