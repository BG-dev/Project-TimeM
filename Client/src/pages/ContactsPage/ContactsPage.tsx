import React, { useState } from 'react';
import { Tabs, TabsProps } from 'antd';
import {
  ContactsList,
  ContactRequestList,
  ContactSearch,
} from '../../components';
import './ContactsPage.scss';

const items: TabsProps['items'] = [
  {
    key: 'contacts',
    label: 'Contacts',
  },
  {
    key: 'requests',
    label: 'Requests',
  },
  {
    key: 'search',
    label: 'Search',
  },
];

function ContactsPage() {
  const [currentTab, setCurrentTab] = useState<
    'contacts' | 'requests' | 'search'
  >('contacts');

  let content = <ContactsList />;

  if (currentTab === 'requests') {
    content = <ContactRequestList />;
  } else if (currentTab === 'search') {
    content = <ContactSearch />;
  }

  const onChangeTabs = (key: string) => {
    if (key === 'contacts' || key === 'requests' || key === 'search')
      setCurrentTab(key);
  };

  return (
    <div className="contacts">
      <div className="contacts__header">
        <Tabs items={items} onChange={onChangeTabs} />
      </div>
      <div className="contacts__content">{content}</div>
    </div>
  );
}

export default ContactsPage;
