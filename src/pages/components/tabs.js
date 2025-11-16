import { jsx as _jsx } from "react/jsx-runtime";
import MyTabs from '@/components/business/tabs';
const options = [
    {
        label: 'Tab-1',
        value: 1,
    },
    {
        label: 'Tab-2',
        value: 2,
    },
];
const TabsPage = () => {
    return (_jsx("div", { children: _jsx(MyTabs, { options: options }, void 0) }, void 0));
};
export default TabsPage;
