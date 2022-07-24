import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.userReducer.user);
  const { username } = user;

  return (
    <>
      <h1>Your Profile</h1>
      <div className="row">
        <i className="col large material-icons">account_circle</i>
        <h4 className="col">{username}</h4>
      </div>
    </>
  );
}

export default ProfilePage;
