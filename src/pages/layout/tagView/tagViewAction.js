import { jsx as _jsx } from "react/jsx-runtime";
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LocaleFormatter } from '@/locales';
import { removeAllTag, removeOtherTag, removeTag } from '@/stores/tags-view.store';
const TagsViewAction = () => {
    const { activeTagId } = useSelector(state => state.tagsView);
    const dispatch = useDispatch();
    return (_jsx(Dropdown, { menu: {
            items: [
                {
                    key: '0',
                    onClick: () => dispatch(removeTag(activeTagId)),
                    label: _jsx(LocaleFormatter, { id: "tagsView.operation.closeCurrent" }, void 0),
                },
                {
                    key: '1',
                    onClick: () => dispatch(removeOtherTag()),
                    label: _jsx(LocaleFormatter, { id: "tagsView.operation.closeOther" }, void 0),
                },
                {
                    key: '2',
                    onClick: () => dispatch(removeAllTag()),
                    label: _jsx(LocaleFormatter, { id: "tagsView.operation.closeAll" }, void 0),
                },
                {
                    key: '3',
                    type: 'divider',
                },
                {
                    key: '4',
                    label: _jsx(Link, { to: "/", children: _jsx(LocaleFormatter, { id: "tagsView.operation.dashboard" }, void 0) }, void 0),
                },
            ],
        }, children: _jsx("span", { id: "pageTabs-actions", children: _jsx(SettingOutlined, { className: "tagsView-extra" }, void 0) }, void 0) }, void 0));
};
export default TagsViewAction;
