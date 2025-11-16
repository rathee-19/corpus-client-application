import { jsx as _jsx } from "react/jsx-runtime";
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const WrapperRouteComponent = ({ titleId, auth = false, element }) => {
    const { formatMessage } = useIntl();
    const { logged } = useSelector((state) => state.user);
    // Set page title
    if (titleId) {
        document.title = formatMessage({ id: titleId });
    }
    // If route requires auth and user is NOT logged in → redirect
    if (auth && !logged) {
        return _jsx(Navigate, { to: "/login", replace: true }, void 0);
    }
    return element;
};
export default WrapperRouteComponent;
