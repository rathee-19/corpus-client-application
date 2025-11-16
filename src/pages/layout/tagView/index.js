import { jsx as _jsx } from "react/jsx-runtime";
import { Tabs } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, } from 'react-router-dom';
import { addTag, removeTag, setActiveTag } from '@/stores/tags-view.store';
import TagsViewAction from './tagViewAction';
const TagsView = () => {
    const { tags, activeTagId } = useSelector(state => state.tagsView);
    const { menuList, locale } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    // onClick tag
    const onChange = (key) => {
        const tag = tags.find(tag => tag.path === key);
        if (tag) {
            setCurrentTag(tag.path);
        }
    };
    // onRemove tag
    const onClose = (targetKey) => {
        dispatch(removeTag(targetKey));
    };
    const setCurrentTag = useCallback((id) => {
        const tag = tags.find(item => {
            if (id) {
                return item.path === id;
            }
            else {
                return item.path === location.pathname;
            }
        });
        if (tag) {
            dispatch(setActiveTag(tag.path));
        }
    }, [dispatch, location.pathname, tags]);
    useEffect(() => {
        if (menuList.length) {
            const menu = menuList.find(m => m.path === location.pathname);
            if (menu) {
                dispatch(addTag({
                    ...menu,
                    closable: menu.code !== 'dashboard',
                }));
            }
        }
    }, [dispatch, location.pathname, menuList]);
    return (_jsx("div", { id: "pageTabs", style: { padding: '6px 4px' }, children: _jsx(Tabs, { tabBarStyle: { margin: 0 }, onChange: onChange, activeKey: activeTagId, type: "editable-card", hideAdd: true, onEdit: (targetKey, action) => action === 'remove' && onClose(targetKey), tabBarExtraContent: _jsx(TagsViewAction, {}, void 0), items: tags.map(tag => {
                return {
                    key: tag.path,
                    closable: tag.closable,
                    label: tag.label[locale],
                };
            }) }, void 0) }, void 0));
};
export default TagsView;
