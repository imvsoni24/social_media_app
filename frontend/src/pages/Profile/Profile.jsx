import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed';
import RightBar from '../../components/rightbar/RightBar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import "./Profile.css"
import axios from "axios"
import { useParams } from 'react-router-dom';
const Profile = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:4500/api/users?username=${username}`
      );
      setUser(response.data);
    };
    fetchUser();
  }, [username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture ||
                  "https://github.com/safak/youtube/blob/mern-social-app/api/public/images/person/noCover.png?raw=true"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture ||
                  "https://github.com/safak/youtube/blob/mern-social-app/api/public/images/person/noAvatar.png?raw=true"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.desc}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile