import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileCard } from "../../components";
import authApi from "../../api/authApi";
import { useAppSelector } from "../../redux/hooks";
import IUser from "../../types/user";

function ProfilePage() {
    const user: IUser | null = useAppSelector((state) => state.user.value);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            try {
                // if (user?.id) {
                //     const response = await authApi.getOne(user.id);
                // }
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
        user && (
            <>
                <h1>My Profile</h1>
                <div className="profile">
                    <ProfileCard user={user} />
                </div>
            </>
        )
    );
}

export default ProfilePage;
