import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from 'antd';
const BaseModal = props => {
    return _jsx(Modal, { ...props }, void 0);
};
const MyModal = Object.assign(Modal, BaseModal);
export default MyModal;
