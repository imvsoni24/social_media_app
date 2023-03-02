import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import { Users } from "../../data";
import Online from '../online/Online';
import axios from "axios"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';
const RightBar = ({user}) => {
  const [friends,setFriends] = useState([])
  const {user:currentUser,dispatch} = useContext(AuthContext);
  const [follow, setFollow] = useState(
    currentUser.followings.includes(user?._id)
  );

  const handleClick=async()=>{
    try{
      if(follow){
        await axios.put(`http://localhost:4500/api/users/${user._id}/unfollow`,{userId:currentUser._id})
        dispatch({ type: "UNFOLLOW", payload: user._id });
      }else{
       await axios.put(
         `http://localhost:4500/api/users/${user._id}/follow`,
         { userId: currentUser._id }
       ); 
       dispatch({ type: "FOLLOW", payload: user._id });
      }

    }catch(err){
      console.log(err)

    }
    setFollow(!follow)
  }

  useEffect(()=>{
    const getfriends = async () => {
      try {
        let friendList = await axios.get(
          `http://localhost:4500/api/users/friends/${user._id}`
        ); 
         setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getfriends()
  },[user])
  const HomeRightBar=()=>{
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/gift.png?raw=true"
            alt=""
          />
          <span className="birthdayText">
            <b>Anushka Sharma</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img
          className="rightbarAd"
          src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/ad.png?raw=true"
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  }
  const ProfileRightBar=()=>{
    return (
      <>
        {user.username !== currentUser.username && (
          <button onClick={handleClick} className="rightBarFollowButton">
            {follow ? "Following" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.length > 0 &&
            friends.map((friend) => (
              <Link
                style={{ textDecoration: "none" }}
                to={`/profile/` + friend.username}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture ||
                      "https://github.com/safak/youtube/blob/mern-social-app/api/public/images/person/noAvatar.png?raw=true"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user?<ProfileRightBar/>:<HomeRightBar/>}
      </div>
    </div>
  );
}

export default RightBar