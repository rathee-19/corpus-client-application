import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Card } from 'antd';
import dayjs from 'dayjs';
import { Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LocaleFormatter } from '@/locales';
const data = new Array(20).fill(null).map((_, index) => ({
    name: dayjs()
        .add(index * 30, 'minute')
        .format('HH:mm'),
    traffic: Math.floor(Math.random() * 120 + 1),
    payments: Math.floor(Math.random() * 120 + 1),
}));
const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        const { value: value1, stroke: stroke1 } = payload[0];
        const { value: value2, stroke: stroke2 } = payload[1];
        return (_jsxs("div", { className: "customTooltip", children: [_jsx("span", { className: "customTooltip-title", children: label }, void 0), _jsxs("ul", { className: "customTooltip-content", children: [_jsxs("li", { children: [_jsx(Badge, { color: stroke1 }, void 0), _jsx(LocaleFormatter, { id: "app.dashboard.timeline.traffic" }, void 0), " ", value1] }, "traffic"), _jsxs("li", { children: [_jsx(Badge, { color: stroke2 }, void 0), _jsx(LocaleFormatter, { id: "app.dashboard.timeline.payments" }, void 0), " ", value2] }, "payments")] }, void 0)] }, void 0));
    }
    return null;
};
const TimeLine = ({ loading }) => {
    return (_jsx(Card, { loading: loading, style: { marginTop: 12 }, children: _jsx(ResponsiveContainer, { height: 400, children: _jsxs(LineChart, { data: data, syncId: "anyId", children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }, void 0), _jsx(XAxis, { dataKey: "name" }, void 0), _jsx(YAxis, {}, void 0), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}, void 0) }, void 0), _jsx(Line, { type: "monotone", dataKey: "traffic", stroke: "#3F90F7" }, void 0), _jsx(Line, { type: "monotone", dataKey: "payments", stroke: "#61BE82" }, void 0), _jsx(Brush, { dataKey: "name", fill: "#13c2c2" }, void 0), _jsx(Legend, { verticalAlign: "top", height: 40, formatter: value => _jsx(LocaleFormatter, { id: ('app.dashboard.timeline.' + value) }, void 0) }, void 0)] }, void 0) }, void 0) }, void 0));
};
export default TimeLine;
