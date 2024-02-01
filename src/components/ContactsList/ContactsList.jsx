import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectFilter,
  selectLoading,
} from 'store/contacts/selectors';
import {
  deleteContactThunk,
  fetchContactsThunk,
} from 'store/contacts/operations';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
`;

const LoadingMessage = styled.h2`
  color: #3498db;
`;

const NoContactsMessage = styled.h2`
  color: #e74c3c;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const ContactName = styled.p`
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const ContactsList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  const handleDeleteContact = id => {
    dispatch(deleteContactThunk(id));
  };

  const filteredContacts = (data, filter) => {
    return data.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <Container>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {!filteredContacts(contacts, filter).length ? (
        <NoContactsMessage>No contacts</NoContactsMessage>
      ) : (
        <List>
          {filteredContacts(contacts, filter).map(contact => (
            <ListItem key={contact.id}>
              <ContactName>
                {contact.name}: <span>{contact.number}</span>
              </ContactName>
              <DeleteButton onClick={() => handleDeleteContact(contact.id)}>
                Delete
              </DeleteButton>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ContactsList;
