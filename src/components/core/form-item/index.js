import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import { useMemo } from 'react';
export class ControlMap {
    props;
    constructor(props) {
        this.props = props;
    }
    get innerProps() {
        return this.props.innerProps;
    }
    input() {
        return _jsx(Input, { ...this.innerProps }, void 0);
    }
    'input-number'() {
        return _jsx(InputNumber, { ...this.innerProps }, void 0);
    }
    switch() {
        return _jsx(Switch, { ...this.innerProps }, void 0);
    }
    'date-picker'() {
        return _jsx(DatePicker, { ...this.innerProps }, void 0);
    }
    checkbox() {
        // highlight-next-line
        return _jsx(Checkbox.Group, { children: this.props.children, options: this.props.options, ...this.innerProps }, void 0);
    }
    radio() {
        // highlight-next-line
        return _jsx(Radio.Group, { children: this.props.children, options: this.props.options, ...this.innerProps }, void 0);
    }
    select() {
        // highlight-next-line
        return _jsx(Select, { children: this.props.children, options: this.props.options, ...this.innerProps }, void 0);
    }
}
const MyformItem = props => {
    // 取出我们自定义的参数，其余的全部原封不动的还给 `Form.Item`
    // type: 用于我们判断外面传进来的控件类型我们再渲染好了直接生成出来
    // children: 因为我们需要自定义 `Form.Item` 的子元素了，如果不取出来但父组件又提供的话会发生冲突
    const { type, required, rules: userRules, ...restProps } = props;
    const rules = useMemo(() => {
        // 如果设置了 rules 属性，说明用户需要完全自定义 rules，不仅仅是必填
        if (userRules)
            return userRules;
        // 如果设置了 required 属性
        if (required) {
            if (typeof required === 'boolean') {
                return [{ required: true, message: `请输入${props.label}` }];
            }
            // 自定义 required 文案
            else if (typeof required === 'string') {
                return [{ required: true, message: required }];
            }
        }
    }, [required, userRules, props.label]);
    // highlight-next-line
    const controlMap = new ControlMap(props);
    return (_jsx(Form.Item, { ...restProps, rules: rules, children: type ? controlMap[type]() : props.children }, void 0));
};
export default MyformItem;
