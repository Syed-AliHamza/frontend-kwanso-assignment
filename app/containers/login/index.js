/**
 *
 * LoginContainer
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/pages/login';
import { login } from '../../state/queryFunctions';
import { useAuthContext } from '../../context/authContext';
import { navigateTo } from '../../utils/helper';

function LoginContainer() {
  const mutation = useMutation((values) => login(values));
  const { data, isError, isSuccess, error } = mutation;
  const { user, setUser } = useAuthContext();
  const history = useHistory();
  let loginError = '';
  const loginUserData = data?.data?.data;
  if (isSuccess) {
    const updatedUser = {
      ...user,
      data: isSuccess && loginUserData,
      isAuthenticated: true,
      token: isSuccess && loginUserData.token,
    };
    setUser(updatedUser);
  }
  if (isError) {
    loginError = error.response?.data?.message;
  }
  useEffect(() => {
    if (user.isAuthenticated) {
      navigateTo(history, `/home`);
    }
  }, [user.isAuthenticated]);

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Login onHandleSubmit={handleSubmit} errorMessage={loginError} />
    </>
  );
}

export default memo(LoginContainer);
