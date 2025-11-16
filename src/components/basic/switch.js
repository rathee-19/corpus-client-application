import { jsx as _jsx } from "react/jsx-runtime";
import { Switch } from 'antd';
const BaseSwitch = ({ children: _, ...props }) => {
    return _jsx(Switch, { ...props }, void 0);
};
const MySwitch = Object.assign(Switch, BaseSwitch);
export default MySwitch;
