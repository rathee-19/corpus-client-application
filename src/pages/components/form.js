import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const FormPage = () => {
    const onFinish = (value) => {
        console.log(value);
    };
    return (_jsxs(MyForm, { onFinish: onFinish, children: [_jsx(MyForm.Item, { label: "\u6D4B\u8BD5", required: true, name: "test", type: "input" }, void 0), _jsx(MyForm.Item, { ...tailLayout, children: _jsx(MyButton, { type: "primary", htmlType: "submit", children: "Submit" }, void 0) }, void 0)] }, void 0));
};
export default FormPage;
