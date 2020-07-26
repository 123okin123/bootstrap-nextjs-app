import React, { ReactElement } from 'react';
import '../styles/global.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { ApiContainer } from '../hooks/useApi';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import { AuthProvider } from '../context/auth';

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
      <ApiContainer.Provider>
        <AuthProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </Provider>
        </AuthProvider>
      </ApiContainer.Provider>
    </>
  );
}
