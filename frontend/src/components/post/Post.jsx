import React from 'react'
import "./post.css"
import { MoreVert } from "@mui/icons-material"
import { Users } from '../../data'

const Post = ({post}) => {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              alt=""
              className="postProfileImg"
              src={Users.filter((u) => u.id === post?.userId).profilePicture}
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId).username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true"
              alt=""
            />
            <img
              className="likeIcon"
              src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/heart.png?raw=true"
              alt=""
            />
            <span className="postLikeCounter">{post.like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post