import React, { ReactElement } from 'react';
import moment from 'moment';

interface Props {
  children: string;
}

export function Date({ children }: Props): ReactElement {
  return <span>{moment(children).format('MMMM Do YYYY, h:mm:ss a')}</span>;
}
