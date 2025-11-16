import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/react';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
const BaseSearch = (props) => {
    const { children, onSearch, ...rest } = props;
    const [form] = MyForm.useForm();
    const { formatMessage } = useLocale();
    const onSubmit = async () => {
        const values = await form.validateFields();
        if (values) {
            onSearch(values);
        }
    };
    return (_jsx("div", { css: styles, children: _jsxs(MyForm, { ...rest, form: form, layout: "inline", children: [children, _jsxs(MyForm.Item, { children: [_jsx(MyButton, { type: "primary", onClick: onSubmit, children: formatMessage({ id: 'component.search.request' }) }, void 0), _jsx(MyButton, { onClick: () => form.resetFields(), children: formatMessage({ id: 'component.search.reset' }) }, void 0)] }, void 0)] }, void 0) }, void 0));
};
const MySearch = Object.assign(BaseSearch, {
    Item: MyForm.Item,
});
export default MySearch;
const styles = css `
  padding: 20px;
  .ant-form-item {
    margin-bottom: 20px;
  }
`;
