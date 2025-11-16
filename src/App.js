import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/App.tsx
import 'dayjs/locale/zh-cn';
import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import { Suspense, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { HistoryRouter, history } from '@/routes/history';
import { LocaleFormatter, localeConfig } from './locales';
import RenderRouter from './routes';
import { setGlobalState } from './stores/global.store';
import { checkAuth } from '@/stores/user.action';
import { setAuthToken } from '@/api/auth.api';
const App = () => {
    const { locale } = useSelector((state) => state.user);
    const { theme, loading } = useSelector((state) => state.global);
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
    // --- AUTH CHECK ---
    useEffect(() => {
        const init = async () => {
            const t = localStorage.getItem('token');
            if (t)
                setAuthToken(t);
            try {
                await dispatch(checkAuth());
            }
            catch { }
            finally {
                setAuthChecked(true);
            }
        };
        init();
    }, [dispatch]);
    // --- THEME INIT ---
    useEffect(() => {
        const isDark = theme === 'dark';
        dispatch(setGlobalState({ theme: isDark ? 'dark' : 'light' }));
        if (!localStorage.getItem('theme')) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)');
            const fn = (e) => {
                dispatch(setGlobalState({ theme: e.matches ? 'dark' : 'light' }));
            };
            mql.addEventListener('change', fn);
        }
    }, []);
    // --- LOCALE INIT ---
    useEffect(() => {
        dayjs.locale(locale === 'en_US' ? 'en' : 'zh-cn');
    }, [locale]);
    const getAntdLocale = () => {
        return locale === 'en_US' ? enUS : zhCN;
    };
    // // 🔥 DEBUG SCREEN — SAFE VERSION (uses authChecked AFTER hooks)
    // if (import.meta.env.MODE === 'development') {
    //   return (
    //     <div style={{ padding: 40 }}>
    //       <h1>APP BOOTED (DEBUG)</h1>
    //       <pre>{JSON.stringify({ authChecked, locale, theme }, null, 2)}</pre>
    //     </div>
    //   );
    // }
    // 🔥 AUTH GATE — SAFE VERSION
    if (!authChecked) {
        return (_jsx("div", { style: { width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }, children: _jsx(Spin, { tip: "Checking authentication..." }, void 0) }, void 0));
    }
    // --- MAIN RENDER ---
    return (_jsx(ConfigProvider, { locale: getAntdLocale(), componentSize: "middle", theme: {
            token: { colorPrimary: '#13c2c2' },
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }, children: _jsx(IntlProvider, { locale: locale.split('_')[0], messages: localeConfig[locale], children: _jsx(HistoryRouter, { history: history, children: _jsxs(Suspense, { fallback: null, children: [_jsx(Spin, { spinning: loading, className: "app-loading-wrapper", style: {
                                backgroundColor: theme === 'dark'
                                    ? 'rgba(0, 0, 0, 0.44)'
                                    : 'rgba(255, 255, 255, 0.44)',
                            }, tip: _jsx(LocaleFormatter, { id: "gloabal.tips.loading" }, void 0) }, void 0), _jsx(RenderRouter, {}, void 0)] }, void 0) }, void 0) }, void 0) }, void 0));
};
export default App;
