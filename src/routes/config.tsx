// src/routes/config.tsx
import type { FC, ReactElement } from 'react';
import type { RouteProps } from 'react-router';

import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export interface WrapperRouteProps extends RouteProps {
  titleId?: string;
  auth?: boolean;   // only true for protected pages
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth = false, element }) => {
  const { formatMessage } = useIntl();
  const { logged } = useSelector((state: any) => state.user);

  // Set page title
  if (titleId) {
    document.title = formatMessage({ id: titleId });
  }

  // If route requires auth and user is NOT logged in → redirect
  if (auth && !logged) {
    return <Navigate to="/login" replace />;
  }

  return element as ReactElement;
};

export default WrapperRouteComponent;
