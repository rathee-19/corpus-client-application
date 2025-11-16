import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { css } from '@emotion/react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const BaseTabs = props => {
    const { options, children, ...rest } = props;
    return (_jsx(Tabs, { ...rest, css: styles, children: options ? options.map(option => _createElement(TabPane, { ...option, tab: option.label, key: option.value })) : children }, void 0));
};
const MyTabs = Object.assign(BaseTabs, Tabs);
export default MyTabs;
const styles = css `
  padding: 0 20px;
  box-shadow: 0 10px 10px -10px rgb(0 0 0 / 10%);
  height: 62px;
  .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-tab {
    padding: 20px 0;
    & + .ant-tabs-tab {
      margin: 0 0 0 42px;
    }
  }
`;
