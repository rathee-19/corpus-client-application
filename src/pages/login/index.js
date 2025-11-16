import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './index.less';
import { Button, Form, Input, Spin, Space, message, theme as antTheme } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';
import { loginAsync } from '@/stores/user.action';
const initialValues = {
    phone: '',
    password: '',
};
const LoginForm = () => {
    console.log('[LoginPage] mounted; token=', localStorage.getItem('token'));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { formatMessage } = useLocale();
    const { token } = antTheme.useToken();
    const [loading, setLoading] = useState(false);
    // If already logged in, redirect to home immediately
    useEffect(() => {
        const t = localStorage.getItem('token');
        if (t) {
            navigate('/', { replace: true });
        }
    }, [navigate]);
    const onFinished = async (form) => {
        setLoading(true);
        try {
            // dispatch async thunk and unwrap result to throw on rejection
            const actionResult = await dispatch(loginAsync(form));
            const payload = unwrapResult(actionResult); // throws if rejected
            // success
            message.success('Login successful!');
            const search = formatSearch(location.search);
            // `formatSearch` may return from as string or object; normalize to string path
            const fromPath = (search?.from && (typeof search.from === 'string' ? search.from : search.from.pathname)) || '/';
            navigate(fromPath, { replace: true });
        }
        catch (err) {
            // unwrapResult throws or thunk may reject; show a readable message
            const msg = typeof err === 'string'
                ? err
                : err?.message || err?.payload || 'Login failed. Please check your credentials.';
            message.error(msg);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "login-page", style: { backgroundColor: token.colorBgContainer }, children: _jsx(Spin, { spinning: loading, tip: "Logging in...", children: _jsxs(Form, { onFinish: onFinished, className: "login-page-form", initialValues: initialValues, children: [_jsx("h2", { children: "Corpus Client \u2014 Sign in" }, void 0), _jsx(Form.Item, { name: "phone", rules: [{ required: true, message: formatMessage({ id: 'gloabal.tips.enterUsernameMessage' }) }], children: _jsx(Input, { placeholder: formatMessage({
                                id: 'global.tips.phone',
                            }) }, void 0) }, void 0), _jsx(Form.Item, { name: "password", rules: [{ required: true, message: formatMessage({ id: 'gloabal.tips.enterPasswordMessage' }) }], children: _jsx(Input.Password, { placeholder: formatMessage({
                                id: 'gloabal.tips.password',
                            }) }, void 0) }, void 0), _jsx(Form.Item, { children: _jsxs(Space, { direction: "vertical", style: { width: '100%' }, children: [_jsx(Button, { htmlType: "submit", type: "primary", className: "login-page-form_button", block: true, children: _jsx(LocaleFormatter, { id: "gloabal.tips.login" }, void 0) }, void 0), _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("a", { onClick: () => navigate('/forgot-password'), children: "Forgot Password?" }, void 0), _jsx("span", { style: { margin: '0 8px' }, children: "|" }, void 0), _jsx("a", { onClick: () => navigate('/signup'), children: "Create an account" }, void 0)] }, void 0)] }, void 0) }, void 0)] }, void 0) }, void 0) }, void 0));
};
export default LoginForm;
