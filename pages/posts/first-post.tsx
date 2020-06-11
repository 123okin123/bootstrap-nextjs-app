import Head from 'next/head'
import React, { ReactElement } from 'react'

export default function FirstPost(): ReactElement {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>First Post</h1>
    </>
  )
}
