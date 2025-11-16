import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoadingOutlined } from '@ant-design/icons';
import { Avatar, Badge, List, Popover, Spin, Tabs, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNoticeList } from '@/api/layout.api';
import { ReactComponent as NoticeSvg } from '@/assets/header/notice.svg';
import { EventStatus } from '@/interface/layout/notice.interface';
import { useLocale } from '@/locales';
const antIcon = _jsx(LoadingOutlined, { style: { fontSize: 24 }, spin: true }, void 0);
const { TabPane } = Tabs;
const HeaderNoticeComponent = () => {
    const [visible, setVisible] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { noticeCount } = useSelector((state) => state.user);
    const { formatMessage } = useLocale();
    const noticeListFilter = (type) => {
        return noticeList.filter(notice => notice.type === type);
    };
    // loads the notices belonging to logged in user
    // and sets loading flag in-process
    const getNotice = async (mountedRef) => {
        setLoading(true);
        try {
            const { status, result } = await getNoticeList();
            if (mountedRef.current) {
                setLoading(false);
                status && setNoticeList(result || []);
            }
        }
        catch (err) {
            if (mountedRef.current) {
                setLoading(false);
                console.error('getNotice failed', err);
            }
        }
    };
    useEffect(() => {
        const mountedRef = { current: true };
        getNotice(mountedRef);
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const tabs = (_jsx("div", { children: _jsx(Spin, { tip: "Loading...", indicator: antIcon, spinning: loading, children: _jsxs(Tabs, { defaultActiveKey: "1", children: [_jsx(TabPane, { tab: `${formatMessage({
                            id: 'app.notice.messages',
                        })}(${noticeListFilter('notification').length})`, children: _jsx(List, { dataSource: noticeListFilter('notification'), renderItem: item => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: item.avatar }, void 0), title: _jsx("a", { href: item.title, children: item.title }, void 0), description: item.datetime }, void 0) }, void 0)) }, void 0) }, "1"), _jsx(TabPane, { tab: `${formatMessage({
                            id: 'app.notice.news',
                        })}(${noticeListFilter('message').length})`, children: _jsx(List, { dataSource: noticeListFilter('message'), renderItem: item => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, { src: item.avatar }, void 0), title: _jsx("a", { href: item.title, children: item.title }, void 0), description: _jsxs("div", { className: "notice-description", children: [_jsx("div", { className: "notice-description-content", children: item.description }, void 0), _jsx("div", { className: "notice-description-datetime", children: item.datetime }, void 0)] }, void 0) }, void 0) }, void 0)) }, void 0) }, "2"), _jsx(TabPane, { tab: `${formatMessage({
                            id: 'app.notice.tasks',
                        })}(${noticeListFilter('event').length})`, children: _jsx(List, { dataSource: noticeListFilter('event'), renderItem: item => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { title: _jsxs("div", { className: "notice-title", children: [_jsx("div", { className: "notice-title-content", children: item.title }, void 0), _jsx(Tag, { color: EventStatus[item.status], children: item.extra }, void 0)] }, void 0), description: item.description }, void 0) }, void 0)) }, void 0) }, "3")] }, void 0) }, void 0) }, void 0));
    return (_jsx(Popover, { content: tabs, overlayClassName: "bg-2", placement: "bottomRight", trigger: ['click'], open: visible, onOpenChange: v => setVisible(v), overlayStyle: {
            width: 336,
        }, children: _jsx(Tooltip, { title: formatMessage({
                id: 'gloabal.tips.theme.noticeTooltip',
            }), children: _jsx(Badge, { count: noticeCount, overflowCount: 999, children: _jsx("span", { className: "notice", id: "notice-center", children: _jsx(NoticeSvg, { className: "anticon" }, void 0) }, void 0) }, void 0) }, void 0) }, void 0));
};
export default HeaderNoticeComponent;
