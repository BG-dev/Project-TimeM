import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import IUser from '../../types/user';
import { Loading } from '../../components';
import { useAppSelector } from '../../redux/hooks';
import userApi from '../../api/userApi';
import useAlert from '../../hooks/alert.hook';
import './ProfilePage.scss';

function ProfilePage() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isUserContact, setIsUserContact] = useState<boolean>(false);
    const currentUser: IUser | null = useAppSelector((state) => state.user.value);
    const navigate = useNavigate();
    const { setAlertState } = useAlert();

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            try {
                if (!id) return;
                const response = await userApi.getOne(id);
                setUser(response.data.user);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getUser();

        async function getIsUserContact() {
            setLoading(true);
            try {
                if (!id) return;
                const userData = {
                    userId: id,
                };
                const { isContact } = (await userApi.isContact(userData)).data;

                setIsUserContact(isContact);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (currentUser?.id !== id) getIsUserContact();
    }, [id, currentUser?.id]);

    const sendRequestHandler = async () => {
        if (!id) return;
        try {
            const requestData = {
                recipientId: id,
            };
            const { message } = (await userApi.sendRequest(requestData)).data;
            setAlertState(message, 'info');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContactHandler = async () => {
        if (!id) return;
        try {
            const { message } = (await userApi.deleteContact(id)).data;
            navigate('/contacts');
            setAlertState(message, 'info');
        } catch (error) {
            console.log(error);
        }
    };

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
                    {currentUser?.id !== id && !isUserContact && (
                        <Button onClick={sendRequestHandler}>Send contact request</Button>
                    )}
                    {isUserContact && (
                        <Button danger onClick={deleteContactHandler}>
                            Delete from contacts
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
