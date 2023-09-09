import "./ProfileCard.scss";

function ProfileCard({ user }) {
  return (
    <div className="profile-card">
      <div className="profile-card__avatar">{user.avatar}</div>
      <div className="profile-card__info">
        <p className="profile-card__name">{user.name}</p>
        <p className="profile-card__role">{user.role}</p>
      </div>
    </div>
  );
}

export default ProfileCard;