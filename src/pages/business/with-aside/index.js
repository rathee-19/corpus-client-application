import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Space, Tag } from 'antd';
import { getBusinessUserList } from '@/api/business';
import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
const { Item: SearchItem } = MyPage.MySearch;
const asideOptions = [
    {
        title: 'Tab-1',
        key: 1,
    },
    {
        title: 'Tab-2',
        key: 2,
    },
    {
        title: 'Tab-3',
        key: 3,
    },
];
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
const BusinessWithAsidePage = () => {
    return (_jsx(MyPage, { pageApi: getBusinessUserList, asideData: asideOptions, asideKey: "key", searchRender: _jsxs(_Fragment, { children: [_jsx(SearchItem, { label: "FirstName", name: "firstName", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName1", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName2", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName3", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName4", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName5", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName6", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName7", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName8", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName9", type: "input" }, void 0), _jsx(SearchItem, { label: "FirstName", name: "firstName10", type: "input" }, void 0)] }, void 0), tableOptions: tableColums }, void 0));
};
export default BusinessWithAsidePage;
