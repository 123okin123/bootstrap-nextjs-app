import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../lib/store';
import { useAuth } from '../context/auth';

export default function Home(): ReactElement {
  const dispatch: AppDispatch = useDispatch();

  return <div></div>;
}
