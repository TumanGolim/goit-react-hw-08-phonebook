import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../store/auth/operations';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 300px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #27ae60;
  }
`;

const AuthLink = styled.span`
  display: block;
  margin-top: 10px;
`;

export const Register = () => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = data => {
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        navigate('/');
      });
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <h2>Register</h2>
      <Label>
        Name
        <Input {...register('name')} />
      </Label>
      <Label>
        Email
        <Input {...register('email')} />
      </Label>
      <Label>
        Password
        <Input {...register('password')} type="password" />
      </Label>
      <Button>Register</Button>
      <AuthLink>
        You already have an account? Let's
        <Link to="/login">sign in!</Link>
      </AuthLink>
    </Form>
  );
};
