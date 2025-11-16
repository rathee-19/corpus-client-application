import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import MyTable from '@/components/core/table';
import { useStates } from '@/utils/use-states';
import MyAside from '../aside';
import MyRadioCards from '../radio-cards';
import MySearch from '../search';
import MyTabs from '../tabs';
const BasePage = (props, ref) => {
    const { pageApi, pageParams, searchRender, tableOptions, tableRender, asideKey, asideData, asideValue, asideTreeItemRender, radioCardsData, radioCardsValue, tabsData, tabsValue, } = props;
    const [pageData, setPageData] = useStates({
        pageSize: 20,
        pageNum: 1,
        total: 0,
        data: [],
    });
    const [asideCheckedKey, setAsideCheckedKey] = useState(asideValue);
    useEffect(() => {
        if (asideData) {
            setAsideCheckedKey(asideData[0].key);
        }
    }, [asideData]);
    const getPageData = useCallback(async (params = {}) => {
        if (asideKey && !asideCheckedKey)
            return;
        if (pageApi) {
            const obj = {
                ...params,
                ...pageParams,
                pageSize: pageData.pageSize,
                pageNum: pageData.pageNum,
                [asideKey]: asideCheckedKey,
            };
            const res = await pageApi(obj);
            if (res.status) {
                setPageData({ total: res.result.total, data: res.result.data });
            }
        }
    }, [pageApi, pageParams, pageData.pageSize, pageData.pageNum, asideKey, asideCheckedKey]);
    useEffect(() => {
        getPageData();
    }, [getPageData]);
    const onSearch = (searchParams) => {
        getPageData(searchParams);
    };
    const onSelectAsideTree = ([key]) => {
        setAsideCheckedKey(key);
    };
    const onPageChange = (pageNum, pageSize) => {
        setPageData({ pageNum });
        if (pageSize) {
            setPageData({ pageSize });
        }
    };
    useImperativeHandle(ref, () => ({
        setAsideCheckedKey,
        load: (data) => getPageData(data),
    }));
    return (_jsxs("div", { css: styles, children: [tabsData && _jsx(MyTabs, { className: "tabs", options: tabsData, defaultValue: tabsData[0].value || tabsValue }, void 0), _jsxs("div", { className: "tabs-main", children: [asideData && (_jsx(MyAside, { options: asideData, selectedKeys: asideCheckedKey ? [asideCheckedKey] : undefined, titleRender: asideTreeItemRender, onSelect: onSelectAsideTree }, void 0)), _jsxs("div", { className: "aside-main", children: [searchRender && (_jsx(MySearch, { className: "search", onSearch: onSearch, children: searchRender }, void 0)), radioCardsData && (_jsx(MyRadioCards, { options: radioCardsData, defaultValue: radioCardsValue || radioCardsData[0].value }, void 0)), tableOptions && (_jsx("div", { className: "table", children: _jsx(MyTable, { height: "100%", dataSource: pageData.data, columns: tableOptions, pagination: {
                                        current: pageData.pageNum,
                                        pageSize: pageData.pageSize,
                                        total: pageData.total,
                                        onChange: onPageChange,
                                    }, children: tableRender?.(pageData.data) }, void 0) }, void 0))] }, void 0)] }, void 0)] }, void 0));
};
const BasePageRef = forwardRef(BasePage);
const MyPage = BasePageRef;
MyPage.MySearch = MySearch;
MyPage.MyTable = MyTable;
MyPage.MyAside = MyAside;
export default MyPage;
const styles = css `
  display: flex;
  flex-direction: column;
  .tabs-main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .search {
    margin-bottom: 10px;
  }

  .aside-main {
    display: flex;
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    @media screen and (max-height: 800px) {
      overflow: auto;
    }
  }

  .table {
    flex: 1;
    overflow: hidden;
    @media screen and (max-height: 800px) {
      overflow: auto;
      min-height: 500px;
    }
  }
`;
