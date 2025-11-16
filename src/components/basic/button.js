import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from 'antd';
const BaseButton = props => {
    return _jsx(Button, { ...props }, void 0);
};
const MyButton = Object.assign(Button, BaseButton);
export default MyButton;
