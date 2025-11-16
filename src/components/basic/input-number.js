import { jsx as _jsx } from "react/jsx-runtime";
import { InputNumber } from 'antd';
const BaseInputNumber = props => {
    return _jsx(InputNumber, { ...props }, void 0);
};
const MyInputNumber = Object.assign(InputNumber, BaseInputNumber);
export default MyInputNumber;
