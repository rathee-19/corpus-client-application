import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import 'driver.js/dist/driver.min.css';
import { Button, Typography } from 'antd';
import { useLocale } from '@/locales';
import useGuide from './useGuide';
const GuidePage = () => {
    const { formatMessage } = useLocale();
    const { driverStart } = useGuide();
    return (_jsx("div", { className: "guide-page ", children: _jsxs("div", { className: "innerText", children: [_jsxs(Typography, { className: "guide-intro", children: [formatMessage({ id: 'app.guide.guideIntro' }), _jsx(Button, { type: "link", className: "driverjs-link", href: "https://github.com/kamranahmedse/driver.js", rel: "noopener noreferrer", target: "_blank", children: "driver.js" }, void 0), "."] }, void 0), _jsx(Button, { type: "primary", onClick: driverStart, children: formatMessage({ id: 'app.guide.showGuide' }) }, void 0)] }, void 0) }, void 0));
};
export default GuidePage;
