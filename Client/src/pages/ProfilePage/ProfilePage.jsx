import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const { username } = useContext(AuthContext);

  return (
    <>
      <h1>Your Profile</h1>
      <div>
        <h2>{username}</h2>
      </div>
    </>
  );
}

export default ProfilePage;
