import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'store/contacts/selectors';
import { addContactThunk } from 'store/contacts/operations';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const AddContacts = () => {
  const [state, setState] = useState({ name: '', number: '', id: '' });
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleChangeInput = e => {
    setState(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact(state);
    setState({ id: '', name: '', number: '' });
  };

  const handleAddContact = contact => {
    const item = contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (item) {
      alert(`${contact.name} is already in contacts`);
    } else {
      dispatch(addContactThunk(contact));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        onChange={handleChangeInput}
        value={state.name}
        type="text"
        name="name"
        id="name"
        required
      />
      <Label htmlFor="number">Number</Label>
      <Input
        onChange={handleChangeInput}
        value={state.number}
        type="tel"
        name="number"
        required
      />
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

AddContacts.propTypes = {
  addContact: PropTypes.func,
};
export default AddContacts;
