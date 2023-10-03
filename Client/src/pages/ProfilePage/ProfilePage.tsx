import React from "react";
import { Empty } from "antd";
// import { ProfileCard } from "../../components";
// import { useAppSelector } from "../../redux/hooks";
// import IUser from "../../types/user";

import "./ProfilePage.scss";

function ProfilePage() {
  // const user: IUser | null = useAppSelector((state) => state.user.value);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   async function getUser() {
  //     setLoading(true);
  //     try {
  //       // if (user?.id) {
  //       //     const response = await authApi.getOne(user.id);
  //       // }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getUser();
  // }, []);

  return (
    <div className="profile">
      <Empty />
    </div>
  );
}

export default ProfilePage;
