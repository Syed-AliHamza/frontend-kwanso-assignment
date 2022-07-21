import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

function HomeContainer() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
    </>
  );
}

export default memo(HomeContainer);
