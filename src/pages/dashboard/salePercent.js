import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Badge, Card, Col, List, Radio, Row } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useLocale } from '@/locales';
const data = {
    all: [
        { name: { zh_CN: '家用电器', en_US: 'appliances' }, value: 4544 },
        { name: { zh_CN: '食用酒水', en_US: 'drinks' }, value: 3321 },
        { name: { zh_CN: '个护健康', en_US: 'health' }, value: 3113 },
        { name: { zh_CN: '服饰箱包', en_US: 'clothing' }, value: 2341 },
        { name: { zh_CN: '母婴产品', en_US: 'baby' }, value: 1231 },
        { name: { zh_CN: '其他', en_US: 'others' }, value: 132 },
    ],
    online: [
        { name: { zh_CN: '家用电器', en_US: 'appliances' }, value: 244 },
        { name: { zh_CN: '食用酒水', en_US: 'drinks' }, value: 231 },
        { name: { zh_CN: '个护健康', en_US: 'health' }, value: 311 },
        { name: { zh_CN: '服饰箱包', en_US: 'clothing' }, value: 41 },
        { name: { zh_CN: '母婴产品', en_US: 'baby' }, value: 121 },
        { name: { zh_CN: '其他', en_US: 'others' }, value: 111 },
    ],
    offline: [
        { name: { zh_CN: '家用电器', en_US: 'appliances' }, value: 99 },
        { name: { zh_CN: '食用酒水', en_US: 'drinks' }, value: 188 },
        { name: { zh_CN: '个护健康', en_US: 'health' }, value: 344 },
        { name: { zh_CN: '服饰箱包', en_US: 'clothing' }, value: 255 },
        { name: { zh_CN: '其他', en_US: 'others' }, value: 65 },
    ],
};
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#E36E7E', '#8F66DE'];
const wrapperCol = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12,
};
const SalePercent = ({ loading }) => {
    const [dataType, setDataType] = useState('all');
    const { locale } = useSelector(state => state.user);
    const { formatMessage } = useLocale();
    return (_jsx(Card, { className: "salePercent", title: formatMessage({ id: 'app.dashboard.salePercent.proportionOfSales' }), loading: loading, extra: _jsxs(Radio.Group, { value: dataType, onChange: e => setDataType(e.target.value), buttonStyle: "solid", children: [_jsx(Radio.Button, { value: "all", children: formatMessage({ id: 'app.dashboard.salePercent.all' }) }, void 0), _jsx(Radio.Button, { value: "online", children: formatMessage({ id: 'app.dashboard.salePercent.online' }) }, void 0), _jsx(Radio.Button, { value: "offline", children: formatMessage({ id: 'app.dashboard.salePercent.offline' }) }, void 0)] }, void 0), children: _jsxs(Row, { gutter: 20, children: [_jsx(Col, { ...wrapperCol, children: _jsx(ResponsiveContainer, { height: 250, children: _jsxs(PieChart, { children: [_jsx(Tooltip, { content: ({ active, payload }) => {
                                        if (active) {
                                            const { name, value } = payload[0];
                                            const total = data[dataType].map(d => d.value).reduce((a, b) => a + b);
                                            const percent = ((value / total) * 100).toFixed(2) + '%';
                                            return (_jsxs("span", { className: "customTooltip", children: [name[locale], " : ", percent] }, void 0));
                                        }
                                        return null;
                                    } }, void 0), _jsx(Pie, { strokeOpacity: 0, data: data[dataType], innerRadius: 60, outerRadius: 80, paddingAngle: 5, dataKey: "value", children: data[dataType].map((_, index) => (_jsx(Cell, { fill: COLORS[index] }, `cell-${index}`))) }, void 0)] }, void 0) }, void 0) }, void 0), _jsx(Col, { ...wrapperCol, children: _jsx(List, { bordered: true, dataSource: data[dataType], renderItem: (item, index) => {
                            const total = data[dataType].map(d => d.value).reduce((a, b) => a + b);
                            const percent = ((item.value / total) * 100).toFixed(2) + '%';
                            return (_jsx(List.Item, { children: _jsx(Badge, { color: COLORS[index] }, void 0) }, void 0));
                        } }, void 0) }, void 0)] }, void 0) }, void 0));
};
export default SalePercent;
