import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './index.less';
import { Drawer, Layout, theme as antTheme } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { setUser } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import { getGlobalState } from '@/utils/getGloabal';
import { useGuide } from '../guide/useGuide';
import HeaderComponent from './header';
import MenuComponent from './menu';
import TagsView from './tagView';
const { Sider, Content } = Layout;
const WIDTH = 992;
const LayoutPage = () => {
    console.log('[LayoutPage] mounted');
    const location = useLocation();
    const [openKey, setOpenkey] = useState();
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    // ensure default array (so child components never see `undefined`)
    const [menuList, setMenuList] = useState([]);
    const { device, collapsed, newUser } = useSelector((state) => state.user);
    const token = antTheme.useToken();
    const isMobile = device === 'MOBILE';
    const dispatch = useDispatch();
    const { driverStart } = useGuide();
    useEffect(() => {
        const code = getFirstPathCode(location.pathname);
        setOpenkey(code);
        setSelectedKey(location.pathname);
    }, [location.pathname]);
    const toggle = () => {
        dispatch(setUser({
            collapsed: !collapsed,
        }));
    };
    const initMenuListAll = (menu) => {
        // Defensive: if menu is not provided or not an array, return empty array.
        if (!Array.isArray(menu))
            return [];
        const MenuListAll = [];
        menu.forEach(m => {
            if (!m?.children?.length) {
                MenuListAll.push(m);
            }
            else {
                m?.children.forEach(mu => {
                    MenuListAll.push(mu);
                });
            }
        });
        return MenuListAll;
    };
    // (You commented out fetchMenuList — fine for now.)
    // If you later re-enable fetching, just setMenuList(result) and update user.menuList similarly.
    useEffect(() => {
        window.onresize = () => {
            const { device } = getGlobalState();
            const rect = document.body.getBoundingClientRect();
            const needCollapse = rect.width < WIDTH;
            dispatch(setUser({
                device,
                collapsed: needCollapse,
            }));
        };
    }, [dispatch]);
    useEffect(() => {
        newUser && driverStart();
    }, [newUser]);
    return (_jsxs(Layout, { className: "layout-page", children: [_jsx(HeaderComponent, { collapsed: collapsed, toggle: toggle }, void 0), _jsxs(Layout, { children: [!isMobile ? (_jsx(Sider, { className: "layout-page-sider", trigger: null, collapsible: true, style: { backgroundColor: token.token.colorBgContainer }, collapsedWidth: isMobile ? 0 : 80, collapsed: collapsed, breakpoint: "md" }, void 0)) : (_jsx(Drawer, { width: "200", placement: "left", bodyStyle: { padding: 0, height: '100%' }, closable: false, onClose: toggle, open: !collapsed, children: _jsx(MenuComponent, { menuList: menuList, openKey: openKey, onChangeOpenKey: k => setOpenkey(k), selectedKey: selectedKey, onChangeSelectedKey: k => setSelectedKey(k) }, void 0) }, void 0)), _jsxs(Content, { className: "layout-page-content", children: [_jsx(TagsView, {}, void 0), _jsx(Suspense, { fallback: null, children: _jsx(Outlet, {}, void 0) }, void 0)] }, void 0)] }, void 0)] }, void 0));
};
export default LayoutPage;
