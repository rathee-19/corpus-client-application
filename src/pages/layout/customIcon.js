import { jsx as _jsx } from "react/jsx-runtime";
import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
import { ReactComponent as DashboardSvg } from '@/assets/menu/dashboard.svg';
import { ReactComponent as DocumentationSvg } from '@/assets/menu/documentation.svg';
import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '@/assets/menu/permission.svg';
export const CustomIcon = props => {
    const { type } = props;
    let com = _jsx(GuideSvg, {}, void 0);
    if (type === 'guide') {
        com = _jsx(GuideSvg, {}, void 0);
    }
    else if (type === 'permission') {
        com = _jsx(PermissionSvg, {}, void 0);
    }
    else if (type === 'dashboard') {
        com = _jsx(DashboardSvg, {}, void 0);
    }
    else if (type === 'account') {
        com = _jsx(AccountSvg, {}, void 0);
    }
    else if (type === 'documentation') {
        com = _jsx(DocumentationSvg, {}, void 0);
    }
    else {
        com = _jsx(GuideSvg, {}, void 0);
    }
    return _jsx("span", { className: "anticon", children: com }, void 0);
};
