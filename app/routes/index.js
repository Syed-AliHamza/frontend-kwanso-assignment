import React from 'react';
import { Switch } from 'react-router-dom';
import NotFoundPage from '../containers/pageNotFound/loadable';
import { renderRoutes } from './routeFuncs';
import PrivateRoute from '../components/hoc/privateRoute';
import { NON_FEATURES, PERMISSIONS } from '../utils/constants';
import { AppModuleRoute } from './appModule';

const { READ } = PERMISSIONS;

function Routes() {
  return (
    <>
      <Switch>
        {renderRoutes(AppModuleRoute())}
        <PrivateRoute
          resource={`${NON_FEATURES.NOT_FOUND}-${READ}`}
          component={NotFoundPage}
        />
      </Switch>
    </>
  );
}

export default Routes;
