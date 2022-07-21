/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Box } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Helmet } from 'react-helmet';
import NoData from '../../components/noData';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Box m={12}>
        <NoData Icon={ErrorOutlineIcon} description="Page Not Found" />
      </Box>
    </>
  );
}
