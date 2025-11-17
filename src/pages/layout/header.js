import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUser } from '@/stores/user.store';
import { logout } from '@/stores/user.action';
import HeaderNoticeComponent from './notice';
import { useEffect, useState } from 'react';
import { getCategoriesApi } from '@/api/categories.api';
const { Header } = Layout;
const HeaderComponent = ({ collapsed, toggle }) => {
    // user slice
    const { logged, locale, device, userInfo, token } = useSelector((state) => state.user);
    const global = useSelector((state) => state.global);
    const themeTokenObj = antTheme.useToken();
    const { token: themeTokens } = themeTokenObj;
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let mounted = true;
        if (logged && token) {
            getCategoriesApi()
                .then(res => {
                if (mounted)
                    setCategories(res.data);
            })
                .catch(err => {
                if (mounted)
                    console.error('Failed to fetch categories:', err);
            });
        }
        return () => {
            mounted = false; // cleanup
        };
    }, [logged, token]);
    const navigate = useNavigate();
    const { formatMessage } = useLocale();
    const onActionClick = async (action) => {
        switch (action) {
            case 'userInfo':
                return;
            case 'userSetting':
                return;
            case 'logout':
                const res = Boolean(await dispatch(logout()));
                res && navigate('/login');
                return;
        }
    };
    const toLogin = () => {
        navigate('/login');
    };
    const selectLocale = ({ key }) => {
        dispatch(setUser({
            locale: key,
        }));
        localStorage.setItem('locale', key);
    };
    const onChangeTheme = () => {
        // toggle theme via global store
        const newTheme = global.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        dispatch(setGlobalState({
            theme: newTheme,
        }));
    };
    return (_jsxs(Header, { className: "layout-page-header bg-2", style: { backgroundColor: themeTokens?.colorBgContainer }, children: [device !== 'MOBILE' && (_jsxs("div", { className: "logo", style: { width: collapsed ? 80 : 200 }, children: [_jsx("img", { src: ReactSvg, alt: "", style: { marginRight: collapsed ? '2px' : '20px' } }, void 0), _jsx("img", { src: AntdSvg, alt: "" }, void 0)] }, void 0)), _jsxs("div", { className: "layout-page-header-main", children: [_jsx("div", { onClick: toggle, children: _jsx("span", { id: "sidebar-trigger", children: collapsed ? _jsx(MenuUnfoldOutlined, {}, void 0) : _jsx(MenuFoldOutlined, {}, void 0) }, void 0) }, void 0), _jsxs("div", { className: "actions", children: [_jsx(Tooltip, { title: formatMessage({
                                    id: global.theme === 'dark'
                                        ? 'gloabal.tips.theme.lightTooltip'
                                        : 'gloabal.tips.theme.darkTooltip',
                                }), children: _jsx("span", { children: createElement(themeTokens ? SunSvg : MoonSvg, {
                                        onClick: onChangeTheme,
                                    }) }, void 0) }, void 0), _jsx(HeaderNoticeComponent, {}, void 0),  _jsx(Dropdown, { menu: {
                                    items: categories.map((cat) => ({
                                        key: cat.id,
                                        label: cat.title || cat.name,
                                    })),
                                }, onOpenChange: (open) => {
                                    if (open && token) {
                                        getCategoriesApi()
                                            .then((res) => setCategories(res.data))
                                            .catch((err) => console.error('Failed to fetch categories:', err));
                                    }
                                }, children: _jsx("span", { style: { marginRight: '16px', cursor: 'pointer' }, children: "Categories" }, void 0) }, void 0), logged ? (_jsx(Dropdown, { menu: {
                                    items: [
                                        {
                                            key: '1',
                                            icon: _jsx(UserOutlined, {}, void 0),
                                            label: (_jsx("span", { onClick: () => navigate('/dashboard'), children: userInfo?.name || _jsx(LocaleFormatter, { id: "header.avator.account" }, void 0) }, void 0)),
                                        },
                                        {
                                            key: '2',
                                            icon: _jsx(LogoutOutlined, {}, void 0),
                                            label: (_jsx("span", { onClick: () => onActionClick('logout'), children: _jsx(LocaleFormatter, { id: "header.avator.logout" }, void 0) }, void 0)),
                                        },
                                    ],
                                }, children: _jsxs("span", { className: "user-action", children: [_jsx("img", { src: Avator, className: "user-avator", alt: "avator" }, void 0), _jsx("span", { style: { marginLeft: '8px' }, children: userInfo?.name || 'User' }, void 0)] }, void 0) }, void 0)) : (_jsx("span", { style: { cursor: 'pointer' }, onClick: toLogin }, void 0))] }, void 0)] }, void 0)] }, void 0));
};
export default HeaderComponent;
