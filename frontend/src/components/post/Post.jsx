import React,{useContext, useEffect, useState} from 'react'
import "./post.css"
import { MoreVert } from "@mui/icons-material"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Post = ({post}) => {
  console.log(post.img)
  const { user:currentUser } = useContext(AuthContext);
  const [like,setLike] = useState(post.likes.length)
  const [isLike,setIsLike] = useState(false);
  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  const likeHandler=async()=>{
    try{
     await axios.put("http://localhost:4500/api/posts/"+post._id+"/like",{userId:currentUser._id});
    //  console.log(res.data)
    }
    catch(err){
    console.log(err)
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
    
  }
   

  const [user, setUser] = useState({});
  

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:4500/api/users?userId=${post.userId}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              alt=""
              className="postProfileImg"
              src={
                user.profilePicture ||
                "https://github.com/safak/youtube/blob/mern-social-app/api/public/images/person/noAvatar.png?raw=true"
              }
            />
            <Link
              style={{ textDecoration: "none" }}
              to={`/profile/${user.username}`}
            >
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img
            className="postImg"
            src={process.env.REACT_APP_IMAGE_PATH+post.img}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/like.png?raw=true"
              alt=""
            />
            <img
              onClick={likeHandler}
              className="likeIcon"
              src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/heart.png?raw=true"
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
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