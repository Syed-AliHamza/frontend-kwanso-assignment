import { Box } from '@material-ui/core';
import React from 'react';
import { H5 } from '../typography';
import Show from '../show';

export default function BoxWithBg({
  showTitle = true,
  title,
  titleColor = 'dark',
  titleWeight = { bold: 'bold' },
  bgColor,
  color = 'text.light',
  textAlignment = 'null',
  children,
  styles,
}) {
  return (
    <Box>
      <Show IF={showTitle}>
        <Box ml={1} my={4}>
          <H5 color={titleColor} {...titleWeight}>
            {title}
          </H5>
        </Box>
      </Show>
      <Box
        className={styles}
        bgcolor={bgColor}
        color={color}
        textAlign={textAlignment}
        borderRadius="5px"
        m={1}
        p={3}
      >
        {children}
      </Box>
    </Box>
  );
}
