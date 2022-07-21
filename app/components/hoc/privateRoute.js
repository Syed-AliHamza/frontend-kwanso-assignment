import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import NotFound from '../../containers/notFound/loadable';

const PrivateRoute = ({ component: Component, resource, path, ...rest }) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        // If not logged in redirect to login page
        if (!user || !user.isAuthenticated) {
          return <Redirect to="/" />;
        }
        if (user.isAuthenticated) {
          return <Component {...props} />;
        }
        return <NotFound />;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default PrivateRoute;
