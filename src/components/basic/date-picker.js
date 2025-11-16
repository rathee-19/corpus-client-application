import { jsx as _jsx } from "react/jsx-runtime";
import { DatePicker } from 'antd';
const BasePicker = props => {
    return _jsx(MyDatePicker, { ...props }, void 0);
};
const MyDatePicker = Object.assign(DatePicker, BasePicker);
export default MyDatePicker;
