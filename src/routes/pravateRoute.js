import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
    const { logged } = useSelector((state) => state.user);
    const location = useLocation();
    // If authenticated, render children (the protected route)
    if (logged)
        return children ?? null;
    // Not authenticated: redirect to login and preserve return location in state
    return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true }, void 0);
};
export default PrivateRoute;
