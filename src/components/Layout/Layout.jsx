import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { logoutThunk } from 'store/auth/operations';
import { selectIsLoggedIn, selectUser } from 'store/auth/selectors';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #2c3e50;
  color: white;
`;

const Links = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Layout = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { name } = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <>
      <Nav>
        <Links>
          {isLoggedIn && (
            <li>
              <NavLink to="/">Contacts</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          )}
        </Links>
        {isLoggedIn && (
          <UserSection>
            <h2>User: {name}</h2>
            <button onClick={handleLogout} className="hover:text-red-500">
              Logout
            </button>
          </UserSection>
        )}
      </Nav>

      <hr />
      <Outlet />
    </>
  );
};

export default Layout;
