import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import IUser from "../../types/user";
import "./ProfilePage.scss";
import authApi from "../../api/authApi";
import { Loading } from "../../components";
import { useAppSelector } from "../../redux/hooks";

function ProfilePage() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const currentUser: IUser | null = useAppSelector((state) => state.user.value);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        if (!id) return;
        const response = await authApi.getOne(id);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <div className="profile">
      <div className="profile__header" />
      <div className="profile__content">
        <div className="profile__info">
          {/* <img src="" alt="avatar" className="profile__info-avatar" /> */}
          <div className="profile__info-avatar" />
          <p className="profile__info-username">{user?.username}</p>
          <p className="profile__info-position">Full-stack dev</p>
          <p className="profile__info-email">{user?.email}</p>
        </div>
        <div className="profile__actions">
          {currentUser?.id !== id && <Button>Send contact request</Button>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
