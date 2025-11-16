import { jsx as _jsx } from "react/jsx-runtime";
import { Modal } from 'antd';
import { useForm } from 'antd/es/form/Form';
import MyForm from '../form';
const BaseModal = (props) => {
    const { form, formProps, children, onClose, ...rest } = props;
    const [formInstance] = useForm();
    const onOk = async () => {
        if (form) {
            const data = await formInstance.validateFields();
            onClose && onClose(data);
        }
        else {
            onClose && onClose();
        }
    };
    return (_jsx(Modal, { ...rest, onCancel: () => onClose?.(), onOk: onOk, children: form ? (_jsx(MyForm, { ...formProps, form: formInstance, children: children }, void 0)) : (children) }, void 0));
};
BaseModal.defaultProps = {
    width: '1000px',
};
const MyModal = Object.assign(BaseModal, Modal);
export default MyModal;
