import React, { useContext, useRef, useState } from 'react'
import "./share.css"
import { Cancel, EmojiEmotions, Label, PermMedia, Room, } from "@mui/icons-material"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef()
  const [file,setFile] = useState(null)
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile)
  };

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", file,file.name);
    formData.append("userId", user._id);
    formData.append("desc", desc.current.value);
   

    try{
    await axios.post(
      "http://localhost:4500/api/posts/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    window.location.reload()
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture ||
              "https://github.com/safak/youtube/blob/mern-social-app/api/public/images/person/noAvatar.png?raw=true"
            }
            alt=""
          />
          <input
            ref={desc}
            type="text"
            className="shareInput"
            placeholder={"What's in your mind " + user.username + "?"}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="shareBottom">
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id='file'
                name='file'
                accept='image/*'
                onChange={handleChange}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Loaction</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share