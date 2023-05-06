import React from "react";
import { useSelector } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      <h1>Your Profile</h1>
      <div>
        <h2>{user.username}</h2>
      </div>
    </>
  );
}

export default ProfilePage;
