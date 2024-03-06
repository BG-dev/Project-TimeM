import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import IUser from '../../types/user';
import userApi from '../../api/userApi';
import Loading from '../Loading';
import './ContactsList.scss';

function ContactsList() {
    const [contacts, setContacts] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function getContacts() {
            setLoading(true);
            try {
                const response = await userApi.getContacts();
                setContacts(response.data.contacts);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getContacts();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <ul className="contacts__list">
            {contacts.map((contact) => (
                <li className="contacts__list-item" key={contact.id}>
                    <NavLink to={`/user/${contact.id}`}>
                        <div className="contact-card">
                            <div className="contact-card__avatar" />
                            <div className="contact-card__info">
                                <p className="contact-card__username">{contact.username}</p>
                                <p className="contact-card__email">{contact.email}</p>
                            </div>
                        </div>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}

export default ContactsList;
