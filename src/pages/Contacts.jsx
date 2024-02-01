import AddContacts from 'components/AddContacts/AddContacts';
import ContactsList from 'components/ContactsList/ContactsList';
import FilterContacts from 'components/FilterContacts/FilterContacts';
import React from 'react';

const Contacts = () => {
  return (
    <div>
      <h1>Phonebook</h1>
      <AddContacts />
      <h2>Contacts</h2>
      <FilterContacts />
      <ContactsList />
    </div>
  );
};

export default Contacts;