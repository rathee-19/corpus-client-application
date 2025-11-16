import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox } from 'antd';
const BaseCheckBox = props => {
    return _jsx(Checkbox, { ...props }, void 0);
};
const MyCheckBox = Object.assign(Checkbox, BaseCheckBox);
export default MyCheckBox;
