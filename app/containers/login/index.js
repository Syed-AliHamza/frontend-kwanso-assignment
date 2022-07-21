/**
 *
 * LoginContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Login } from '../../components/pages/login';
import { googleLogin, login } from '../../state/queryFunctions';
import { useAuthContext } from '../../context/authContext';
import { navigateTo } from '../../utils/helper';
import { APP_MODULE } from '../../utils/constants';

function LoginContainer() {
  const mutation = useMutation((values) => login(values));
  const {
    data: googleData,
    isSuccess: googleIsSuccess,
    mutate: googleMutate,
    isError: isGoogleError,
  } = useMutation((values) => googleLogin(values));
  const { data, isError, isSuccess, error } = mutation;
  const { user, setUser } = useAuthContext();
  const history = useHistory();
  const [googleError, setGoogleError] = useState('');
  let loginError = '';
  const loginUserData = data?.data?.data;
  const googleUserData = googleData?.data?.data;
  if (isSuccess || googleIsSuccess) {
    const updatedUser = {
      ...user,
      data: isSuccess ? loginUserData : googleUserData,
      isAuthenticated: true,
      token: isSuccess ? loginUserData.token : googleUserData.token,
    };
    setUser(updatedUser);
  }
  if (isError) {
    loginError = error.response?.data?.message;
  } else if (isGoogleError) {
    loginError = 'Invalid Token';
  }
  useEffect(() => {
    if (user.isAuthenticated) {
      navigateTo(history, `/${APP_MODULE.CENTRAL_POINT}/home`);
    }
  }, [user.isAuthenticated]);

  const handleGoogleLoginSuccess = ({ tokenId }) => {
    googleMutate({ tokenId });
  };
  const handleGoogleLoginFailed = (e) => {
    setGoogleError(e.error);
  };

  const handleSubmit = (values) => {
    mutation.mutate(values);
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Description of Login" />
      </Helmet>
      <Login
        onHandleSubmit={handleSubmit}
        onGoogleSuccess={handleGoogleLoginSuccess}
        onGoogleFailed={handleGoogleLoginFailed}
        googleError={googleError}
        errorMessage={loginError}
      />
    </>
  );
}

export default memo(LoginContainer);
