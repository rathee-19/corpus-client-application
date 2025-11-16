import { jsx as _jsx } from "react/jsx-runtime";
import { Radio } from 'antd';
const BaseRadio = props => {
    return _jsx(Radio, { ...props }, void 0);
};
const MyRadio = Object.assign(Radio, BaseRadio);
export default MyRadio;
