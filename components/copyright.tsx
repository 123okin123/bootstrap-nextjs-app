import React, { ReactElement } from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Copyright(): ReactElement {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://nikolai-kratz.com">
        Nikolai Kratz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
