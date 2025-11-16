import { jsx as _jsx } from "react/jsx-runtime";
import { Typography } from 'antd';
import MyAside from '@/components/business/aside';
const { Title } = Typography;
const options = [
    {
        title: 'Tab-1',
        key: 1,
    },
    {
        title: 'Tab-2',
        key: 2,
    },
    {
        title: 'Tab-3',
        key: 3,
    },
];
const SidePage = () => {
    return (_jsx("div", { children: _jsx(MyAside, { options: options, defaultSelectedKeys: [1], header: _jsx(Title, { level: 4, children: "Costom Header" }, void 0), footer: _jsx(Title, { level: 5, children: "Costom Footer" }, void 0) }, void 0) }, void 0));
};
export default SidePage;
