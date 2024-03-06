import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import IContactRequest from '../../types/contactRequest';
import userApi from '../../api/userApi';
import Loading from '../Loading';
import useAlert from '../../hooks/alert.hook';
import './ContactRequestList.scss';

function ContactRequestList() {
    const [requests, setRequests] = useState<IContactRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { setAlertState } = useAlert();

    useEffect(() => {
        async function getRequests() {
            setLoading(true);
            try {
                const response = await userApi.getRequests();
                setRequests(response.data.requests);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getRequests();
    }, []);

    const removeContactRequest = (requestId: string) => {
        const newRequests = requests.filter((request) => request.id !== requestId);
        setRequests(newRequests);
    };

    const acceptRequestHandler = async (id: string | undefined) => {
        if (!id) return;
        try {
            const requestData = {
                requestId: id,
            };
            const { message } = (await userApi.acceptRequest(requestData)).data;
            removeContactRequest(id);
            setAlertState(message, 'info');
        } catch (error) {
            console.log(error);
        }
    };

    const denyRequestHandler = async (id: string | undefined) => {
        if (!id) return;
        try {
            const requestData = {
                requestId: id,
            };
            const { message } = (await userApi.denyRequest(requestData)).data;
            removeContactRequest(id);
            setAlertState(message, 'info');
        } catch (error) {
            console.log(error);
        }
    };

    return loading ? (
        <Loading />
    ) : (
        <ul className="contacts-requests__list">
            {requests.map((request) => (
                <li className="contacts__list-item" key={request.id}>
                    <div className="request-card">
                        <div className="request-card__avatar" />
                        <div className="request-card__info">
                            <p className="request-card__text">Contact request</p>
                            <p className="request-card__username">{request.sender?.username}</p>
                            <div className="request-card__actions">
                                <Button
                                    type="primary"
                                    onClick={() => acceptRequestHandler(request.id)}
                                >
                                    Accept
                                </Button>
                                <Button danger onClick={() => denyRequestHandler(request.id)}>
                                    Deny
                                </Button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default ContactRequestList;
