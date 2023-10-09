import React, { useEffect, useState } from "react";
import { Button, Tabs, TabsProps } from "antd";
import { NavLink } from "react-router-dom";
import IUser from "../../types/user";
import userApi from "../../api/userApi";
import "./ContactsPage.scss";
import { Loading } from "../../components";
import IContactRequest from "../../types/contactRequest";
import { useAlert } from "../../hooks/alert.hook";

const items: TabsProps["items"] = [
  {
    key: "contacts",
    label: "Contacts",
  },
  {
    key: "requests",
    label: "Requests",
  },
  {
    key: "search",
    label: "Search",
  },
];

function ContactsPage() {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const [requests, setRequests] = useState<IContactRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAlertState } = useAlert();
  const [currentTab, setCurrentTab] = useState<"contacts" | "requests">(
    "contacts",
  );

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
    if (currentTab === "contacts") getContacts();
    else getRequests();
  }, [currentTab]);

  const onChangeTabs = (key: string) => {
    if (key === "contacts" || key === "requests") setCurrentTab(key);
  };

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
      setAlertState(message, "info");
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
      setAlertState(message, "info");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contacts">
      <div className="contacts__header">
        <Tabs items={items} onChange={onChangeTabs} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="contacts__content">
          {currentTab === "contacts" ? (
            <ul className="contacts__list">
              {contacts.map((contact) => (
                <li className="contacts__list-item" key={contact.id}>
                  <NavLink to={`/user/${contact.id}`}>
                    <div className="contact-card">
                      <div className="contact-card__avatar" />
                      <div className="contact-card__info">
                        <p className="contact-card__username">
                          {contact.username}
                        </p>
                        <p className="contact-card__email">{contact.email}</p>
                      </div>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="contacts-requests__list">
              {requests.map((request) => (
                <li className="contacts__list-item" key={request.id}>
                  <div className="request-card">
                    <div className="request-card__avatar" />
                    <div className="request-card__info">
                      <p className="request-card__text">Contact request</p>
                      <p className="request-card__username">
                        {request.sender?.username}
                      </p>
                      <div className="request-card__actions">
                        <Button
                          type="primary"
                          onClick={() => acceptRequestHandler(request.id)}
                        >
                          Accept
                        </Button>
                        <Button
                          danger
                          onClick={() => denyRequestHandler(request.id)}
                        >
                          Deny
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ContactsPage;
