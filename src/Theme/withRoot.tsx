import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

import Theme from './Theme';

export default function withRoot<P extends JSX.IntrinsicAttributes> (
  Component: React.ComponentType<P>,
) {
  function WithRoot (props: P) {
    return (
      <ThemeProvider theme={Theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    );
  }

  return WithRoot;
}