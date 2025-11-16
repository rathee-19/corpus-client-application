import { jsx as _jsx } from "react/jsx-runtime";
import './index.less';
import { Typography } from 'antd';
import { LocaleFormatter } from '@/locales';
const RoutePermissionPage = () => {
    return (_jsx("div", { className: "permission-page", children: _jsx(Typography, { className: "permission-intro", children: _jsx(LocaleFormatter, { id: "gloabal.tips.loginResult" }, void 0) }, void 0) }, void 0));
};
export default RoutePermissionPage;
