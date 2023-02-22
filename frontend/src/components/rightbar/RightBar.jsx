import React from 'react'
import "./rightbar.css"

const RightBar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
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
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/3.jpeg?raw=true"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/3.jpeg?raw=true"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/3.jpeg?raw=true"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/3.jpeg?raw=true"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="https://github.com/safak/youtube/blob/react-social-ui/public/assets/person/3.jpeg?raw=true"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RightBar