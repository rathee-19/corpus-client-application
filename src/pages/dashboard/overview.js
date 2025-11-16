import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Badge, Card, Col, Progress, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip as RTooltip, XAxis } from 'recharts';
import { useLocale } from '@/locales';
import { ReactComponent as CaretDownIcon } from './assets/caret-down.svg';
import { ReactComponent as CaretUpIcon } from './assets/caret-up.svg';
const data = new Array(14).fill(null).map((_, index) => ({
    name: dayjs().add(index, 'day').format('YYYY-MM-DD'),
    number: Math.floor(Math.random() * 8 + 1),
}));
const wrapperCol = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 6,
};
const ColCard = ({ metaName, metaCount, body, footer, loading }) => {
    return (_jsx(Col, { ...wrapperCol, children: _jsxs(Card, { loading: loading, className: "overview", bordered: false, children: [_jsxs("div", { className: "overview-header", children: [_jsx("div", { className: "overview-header-meta", children: metaName }, void 0), _jsx("div", { className: "overview-header-count", children: metaCount }, void 0), _jsx(Tooltip, { title: "Introduce", children: _jsx(InfoCircleOutlined, { className: "overview-header-action" }, void 0) }, void 0)] }, void 0), _jsx("div", { className: "overview-body", children: body }, void 0), _jsx("div", { className: "overview-footer", children: footer }, void 0)] }, void 0) }, void 0));
};
const Trend = ({ wow, dod, style = {} }) => {
    const { formatMessage } = useLocale();
    return (_jsxs("div", { className: "trend", style: style, children: [_jsxs("div", { className: "trend-item", children: [_jsx("span", { className: "trend-item-label", children: formatMessage({ id: 'app.dashboard.overview.wowChange' }) }, void 0), _jsx("span", { className: "trend-item-text", children: wow }, void 0), _jsx(CaretUpIcon, { color: "#f5222d" }, void 0)] }, void 0), _jsxs("div", { className: "trend-item", children: [_jsx("span", { className: "trend-item-label", children: formatMessage({ id: 'app.dashboard.overview.dodChange' }) }, void 0), _jsx("span", { className: "trend-item-text", children: dod }, void 0), _jsx(CaretDownIcon, { color: "#52c41a" }, void 0)] }, void 0)] }, void 0));
};
const CustomTooltip = ({ active, payload, label }) => active && (_jsx("div", { className: "customTooltip", children: _jsxs("span", { className: "customTooltip-title", children: [_jsx(Badge, { color: payload[0].fill }, void 0), " ", label, " : ", payload[0].value] }, void 0) }, void 0));
const Field = ({ name, number }) => (_jsxs("div", { className: "field", children: [_jsx("span", { className: "field-label", children: name }, void 0), _jsxs("span", { className: "field-number", children: [number, " "] }, void 0)] }, void 0));
const Overview = ({ loading }) => {
    const { formatMessage } = useLocale();
    return (_jsxs(Row, { gutter: [12, 12], children: [_jsx(ColCard, { loading: loading, metaName: formatMessage({ id: 'app.dashboard.overview.totalSales' }), metaCount: "\u00A5 126,560", body: _jsx(Trend, { wow: "12%", dod: "12%" }, void 0), footer: _jsx(Field, { name: formatMessage({ id: 'app.dashboard.overview.dailySales' }), number: "\uFFE512,423" }, void 0) }, void 0), _jsx(ColCard, { loading: loading, metaName: formatMessage({ id: 'app.dashboard.overview.visits' }), metaCount: "8846", body: _jsx(ResponsiveContainer, { children: _jsxs(AreaChart, { data: data, children: [_jsx(XAxis, { dataKey: "name", hide: true }, void 0), _jsx(RTooltip, { content: _jsx(CustomTooltip, {}, void 0) }, void 0), _jsx(Area, { strokeOpacity: 0, type: "monotone", dataKey: "number", fill: "#8E65D3" }, void 0)] }, void 0) }, void 0), footer: _jsx(Field, { name: formatMessage({ id: 'app.dashboard.overview.dailySales' }), number: "1234" }, void 0) }, void 0), _jsx(ColCard, { loading: loading, metaName: formatMessage({ id: 'app.dashboard.overview.payments' }), metaCount: "6560", body: _jsx(ResponsiveContainer, { children: _jsxs(BarChart, { data: data, children: [_jsx(XAxis, { dataKey: "name", hide: true }, void 0), _jsx(RTooltip, { content: _jsx(CustomTooltip, {}, void 0) }, void 0), _jsx(Bar, { strokeOpacity: 0, barSize: 10, dataKey: "number", stroke: "#3B80D9", fill: "#3B80D9" }, void 0)] }, void 0) }, void 0), footer: _jsx(Field, { name: formatMessage({ id: 'app.dashboard.overview.conversionRate' }), number: "60%" }, void 0) }, void 0), _jsx(ColCard, { loading: loading, metaName: formatMessage({ id: 'app.dashboard.overview.operationalEffect' }), metaCount: "8846", body: _jsx(Progress, { strokeColor: "#58BFC1", percent: 85 }, void 0), footer: _jsx(Trend, { style: { position: 'inherit' }, wow: "12%", dod: "12%" }, void 0) }, void 0)] }, void 0));
};
export default Overview;
