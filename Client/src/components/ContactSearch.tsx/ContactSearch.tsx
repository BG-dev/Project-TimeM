import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import { NavLink } from 'react-router-dom';
import IUser from '../../types/user';
import userApi from '../../api/userApi';
import Loading from '../Loading';
import './ContactSearch.scss';

function ContactSearch() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const onSearchHandler: SearchProps['onSearch'] = async (value) => {
        setLoading(true);
        const search = value;
        try {
            console.log(search);
            const response = await userApi.getAll(search);
            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="users">
            <div className="users__search">
                <Input.Search placeholder="Enter username" onSearch={onSearchHandler} enterButton />
            </div>
            {loading ? (
                <Loading />
            ) : (
                <ul className="users__list">
                    {users.map((user) => (
                        <li className="users__list-item" key={user.id}>
                            <NavLink to={`/user/${user.id}`}>
                                <div className="user-card">
                                    <div className="user-card__avatar" />
                                    <div className="user-card__info">
                                        <p className="user-card__username">{user.username}</p>
                                        <p className="user-card__email">{user.email}</p>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ContactSearch;
