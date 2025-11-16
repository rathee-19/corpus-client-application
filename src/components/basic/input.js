import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from 'antd';
const BaseInput = props => {
    return _jsx(Input, { ...props }, void 0);
};
const MyInput = Object.assign(Input, BaseInput);
export default MyInput;
