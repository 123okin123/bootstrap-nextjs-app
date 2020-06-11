import React, { ReactElement } from 'react'

interface Props {
  Component: any
  pageProps: any
}

export default function App({ Component, pageProps }: Props): ReactElement {
  return <Component {...pageProps} />
}
