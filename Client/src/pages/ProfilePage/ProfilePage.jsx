import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ProfileCard } from "../../components";
import authApi from "../../api/authApi";

function ProfilePage() {
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        const response = await authApi.getOne(id);
        setBoardName(response.board.name);
        dispatch(BoardContextActions.setLists(response.board.tasks));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  console.log(user);

  return (
    <>
      <h1>My Profile</h1>
      <div className="profile">
        <ProfileCard user={user} />
      </div>
    </>
  );
}

export default ProfilePage;
