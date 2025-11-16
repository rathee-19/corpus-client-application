import { jsx as _jsx } from "react/jsx-runtime";
import MyRadioCards from '@/components/business/radio-cards';
const options = [
    {
        label: 'Option-1',
        value: 1,
    },
    {
        label: 'Option-2',
        value: 2,
    },
    {
        label: 'Option-3',
        value: 3,
    },
];
const TabsPage = () => {
    return _jsx(MyRadioCards, { options: options, defaultValue: 1 }, void 0);
};
export default TabsPage;
