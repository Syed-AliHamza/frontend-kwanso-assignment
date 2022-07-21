import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { string, addMethod } from 'yup';
import Routes from '../../routes';
import ErrorBoundary from '../error/errorBoundry';
import { AuthProvider } from '../../context/authContext';
import { noWhitespace } from '../../utils/functions';
import { useStyles } from './style';

export default function App() {
  useStyles();
  addMethod(string, 'noWhitespace', noWhitespace);
  return (
    <>
      <AuthProvider>
        <Router>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </Router>
      </AuthProvider>
    </>
  );
}
