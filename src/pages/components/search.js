import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MySearch from '@/components/business/search';
import MyFormItem from '@/components/core/form-item';
import { useLocale } from '@/locales';
const SearchPage = () => {
    const { formatMessage } = useLocale();
    const onSearch = (values) => {
        console.log(values);
    };
    const nameLabel = formatMessage({ id: 'component.search.name' });
    const sexLabel = formatMessage({ id: 'component.search.sex' });
    const maleLabel = formatMessage({ id: 'component.search.male' });
    const femaleLabel = formatMessage({ id: 'component.search.female' });
    return (_jsxs(MySearch, { onSearch: onSearch, children: [_jsx(MyFormItem, { label: nameLabel, type: "input", name: "name" }, void 0), _jsx(MyFormItem, { label: nameLabel + '1', type: "input", name: "name1" }, void 0), _jsx(MyFormItem, { label: nameLabel + '2', type: "input", name: "name2" }, void 0), _jsx(MyFormItem, { label: nameLabel + '3', type: "input", name: "name3" }, void 0), _jsx(MyFormItem, { label: nameLabel + '4', type: "input", name: "name4" }, void 0), _jsx(MyFormItem, { label: nameLabel + '5', type: "input", name: "name5" }, void 0), _jsx(MyFormItem, { name: "sex", label: sexLabel, type: "radio", initialValue: 1, options: [
                    { label: maleLabel, value: 1 },
                    { label: femaleLabel, value: 2 },
                ] }, void 0)] }, void 0));
};
export default SearchPage;
