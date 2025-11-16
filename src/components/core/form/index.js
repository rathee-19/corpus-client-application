import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from 'antd';
import MyFormItem from '../form-item';
const BaseForm = (props) => {
    const { options, children, ...rest } = props;
    return (_jsxs(Form, { ...rest, children: [options?.map(option => {
                return _jsx(MyFormItem, { ...option }, void 0);
            }), children] }, void 0));
};
const MyForm = Object.assign(BaseForm, Form, { Item: MyFormItem });
export default MyForm;
