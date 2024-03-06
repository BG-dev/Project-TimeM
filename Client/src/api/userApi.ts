import IContactRequest from '../types/contactRequest';
import IUser from '../types/user';
import axiosClient from './axiosClient';

interface IGetOneResponse {
    user: IUser;
}

interface IGetAllResponse {
    users: IUser[];
}

interface IGetContactsResponse {
    contacts: IUser[];
}

interface IGetRequestsResponse {
    requests: IContactRequest[];
}

interface IIsContactResponse {
    isContact: boolean;
}

interface IDeleteContactResponse {
    message: string;
}

interface ISendRequestResponse {
    message: string;
}

interface IAcceptRequestsResponse {
    message: string;
}

interface IDenyRequestsResponse {
    message: string;
}

const userApi = {
    getOne: (id: string) => axiosClient.get<IGetOneResponse>(`/users/${id}`),
    getAll: (search: string) =>
        axiosClient.get<IGetAllResponse>('/users/search', {
            params: { search },
        }),
    getContacts: () => axiosClient.get<IGetContactsResponse>('/users/contacts'),
    getRequests: () => axiosClient.get<IGetRequestsResponse>('/users/requests'),
    isContact: (data: { userId: string }) =>
        axiosClient.post<IIsContactResponse>('/users/is-contact', data),
    deleteContact: (id: string) =>
        axiosClient.delete<IDeleteContactResponse>(`/users/contact/${id}`),
    sendRequest: (data: { recipientId: string }) =>
        axiosClient.post<ISendRequestResponse>('/users/request', data),
    acceptRequest: (data: { requestId: string }) =>
        axiosClient.post<IAcceptRequestsResponse>('/users/accept-request', data),
    denyRequest: (data: { requestId: string }) =>
        axiosClient.post<IDenyRequestsResponse>('/users/deny-request', data),
};

export default userApi;
