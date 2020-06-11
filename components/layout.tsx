import React, { ReactNode, ReactElement } from 'react';
import styles from './layout.module.scss';

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return <div className={styles.container}>{children}</div>;
}

export default Layout;
