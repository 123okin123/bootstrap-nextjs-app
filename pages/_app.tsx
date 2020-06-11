import React, { ReactElement } from 'react';
import '../styles/global.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { ThemeProvider } from '@material-ui/core/styles';

interface Props {
  Component: any;
  pageProps: any;
}

export default function App({ Component, pageProps }: Props): ReactElement {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
