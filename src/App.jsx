import { Route, Routes } from 'react-router-dom';
import Contacts from 'pages/Contacts';
import NotFoundPage from 'pages/NotFoundPage';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import Layout from 'components/Layout/Layout';
import { PrivateRoute } from 'components/Routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'store/auth/operations';
import { selectIsRefresh } from 'store/auth/selectors';

const App = () => {
  const dispatch = useDispatch();
  const isRefresh = useSelector(selectIsRefresh);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  return isRefresh ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
          ;
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;