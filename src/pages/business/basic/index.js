import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Space, Tag } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
const tableColums = [
    {
        title: 'Name',
        children: [
            { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
            { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        ],
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
        title: 'Tags',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags, record) => (_jsx(_Fragment, { children: record.tags.map(tag => (_jsx(Tag, { color: "blue", children: tag }, tag))) }, void 0)),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (_jsxs(Space, { size: "middle", children: [_jsxs(MyButton, { type: "text", children: ["Invite ", record.lastName] }, void 0), _jsx(MyButton, { type: "text", children: "Delete" }, void 0)] }, void 0)),
    },
];
const BusinessBasicPage = () => {
    return _jsx(MyPage, { pageApi: getBusinessUserList, tableOptions: tableColums }, void 0);
};
export default BusinessBasicPage;
