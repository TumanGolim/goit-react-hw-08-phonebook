import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../store/auth/operations';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { selectIsLoggedIn } from '../store/auth/selectors';
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
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const AuthLink = styled.span`
  display: block;
  margin-top: 10px;
`;

export const Login = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = data => {
    dispatch(loginThunk(data))
      .unwrap()
      .then(res => {
        navigate(location.state?.from ?? '/');
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <h2>Login</h2>

      <Label>
        Email
        <Input {...register('email')} />
      </Label>
      <Label>
        Password
        <Input {...register('password')} type="password" />
      </Label>
      <Button>Login</Button>

      <AuthLink>
        You haven't account? Let's{' '}
        <Link to="/register" className="underline text-teal-500">
          create it
        </Link>
      </AuthLink>
    </Form>
  );
};
