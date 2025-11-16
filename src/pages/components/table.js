import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Space, Tag } from 'antd';
import MyButton from '@/components/basic/button';
import MyTable from '@/components/core/table';
const { Column, ColumnGroup } = MyTable;
const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
new Array(30).fill(undefined).forEach((item, index) => {
    data.push({
        key: index + 4 + '',
        firstName: 'Joe' + index,
        lastName: 'Black' + index,
        age: 32 + index,
        address: 'Sidney No. 1 Lake Park' + index,
        tags: ['cool', 'teacher'],
    });
});
const TalbePage = () => {
    return (_jsx("div", { className: "aaa", children: _jsxs(MyTable, { dataSource: data, rowKey: record => record.key, height: "100%", children: [_jsxs(ColumnGroup, { title: "Name", children: [_jsx(Column, { title: "First Name", dataIndex: "firstName" }, "firstName"), _jsx(Column, { title: "Last Name", dataIndex: "lastName" }, "lastName")] }, void 0), _jsx(Column, { title: "Age", dataIndex: "age" }, "age"), _jsx(Column, { title: "Address", dataIndex: "address" }, "address"), _jsx(Column, { title: "Tags", dataIndex: "tags", render: (tags) => (_jsx(_Fragment, { children: tags.map(tag => (_jsx(Tag, { color: "blue", children: tag }, tag))) }, void 0)) }, "tags"), _jsx(Column, { title: "Action", render: (text, record) => (_jsxs(Space, { size: "middle", children: [_jsxs(MyButton, { type: "text", children: ["Invite ", record.lastName] }, void 0), _jsx(MyButton, { type: "text", children: "Delete" }, void 0)] }, void 0)) }, "action")] }, void 0) }, void 0));
};
export default TalbePage;
