import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from 'store/contacts/slice';
import styled from 'styled-components';

const Form = styled.form`
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 8px;
`;

const FilterContacts = () => {
  const dispatch = useDispatch();

  const handleInput = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Form>
      <Input onChange={handleInput} type="text" placeholder="Filter contacts" />
    </Form>
  );
};

export default FilterContacts;