/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';

interface NextComposedProps {
  as: any;
  href: any;
  prefetch: boolean;
  className: string;
}

const NextComposed: React.ForwardRefExoticComponent<
  NextComposedProps & React.RefAttributes<any>
> = React.forwardRef(function NextComposed(props: NextComposedProps, ref: any) {
  const { as, href, ...other } = props;

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface Props {
  activeClassName: string;
  as: any;
  className: string;
  href: any;
  innerRef: any;
  naked: boolean;
  onClick: () => void;
  prefetch: boolean;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: Props) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === 'string' ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />;
  }

  return (
    <MuiLink component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
  );
}

export default React.forwardRef((props: Props, ref) => <Link {...props} innerRef={ref} />) as any;
