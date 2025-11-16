import { jsx as _jsx } from "react/jsx-runtime";
import { Select } from 'antd';
// import { SelectProps, SelectValue } from 'antd/es/select';
// const MySelect = <T extends SelectValue = SelectValue>({ children, ...props }: SelectProps<T>) => {
//   return <Select<T> {...props}>{children}</Select>;
// };
const BaseSelect = props => {
    return _jsx(Select, { ...props }, void 0);
};
const MySelect = Object.assign(Select, BaseSelect);
export default MySelect;
