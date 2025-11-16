import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/stores/user.store';
import { CustomIcon } from './customIcon';
const MenuComponent = props => {
    const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
    const { device, locale } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getTitle = (menu) => {
        return (_jsxs("span", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx(CustomIcon, { type: menu.icon }, void 0), _jsx("span", { children: menu.label[locale] }, void 0)] }, void 0));
    };
    const onMenuClick = (path) => {
        onChangeSelectedKey(path);
        navigate(path);
        if (device !== 'DESKTOP') {
            dispatch(setUser({ collapsed: true }));
        }
    };
    const onOpenChange = (keys) => {
        const key = keys.pop();
        onChangeOpenKey(key);
    };
    return (_jsx(Menu, { mode: "inline", selectedKeys: [selectedKey], openKeys: openKey ? [openKey] : [], onOpenChange: onOpenChange, onSelect: k => onMenuClick(k.key), className: "layout-page-sider-menu text-2", items: menuList.map(menu => {
            return menu.children
                ? {
                    key: menu.code,
                    label: getTitle(menu),
                    children: menu.children.map(child => ({
                        key: child.path,
                        label: child.label[locale],
                    })),
                }
                : {
                    key: menu.path,
                    label: getTitle(menu),
                };
        }) }, void 0));
};
export default MenuComponent;
