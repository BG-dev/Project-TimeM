import React from "react";
import IUser from "../../types/user";
import "./ProfileCard.scss";

interface IProfileCardProps {
  user: IUser;
}

function ProfileCard({ user }: IProfileCardProps) {
  return (
    user && (
      <div className="profile-card">
        <div className="profile-card__avatar">{user.avatar}</div>
        <div className="profile-card__info">
          <p className="profile-card__name">{user.username}</p>
        </div>
      </div>
    )
  );
}

export default ProfileCard;
