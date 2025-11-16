import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { css } from '@emotion/react';
import { Divider, Tree } from 'antd';
const MyAside = props => {
    const { options, header, footer, ...rest } = props;
    return (_jsxs("div", { css: styles, className: "bg-2", children: [header && (_jsxs("div", { className: "header", children: [header, _jsx(Divider, {}, void 0)] }, void 0)), _jsx(Tree, { ...rest, treeData: options, blockNode: true }, void 0), footer && (_jsxs("div", { className: "footer", children: [_jsx(Divider, {}, void 0), footer] }, void 0))] }, void 0));
};
export default MyAside;
const styles = css `
  padding: 8px;
  margin-right: 8px;
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header,
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .ant-tree {
    margin-top: 12px;
    flex: 1;
    .ant-tree-node-content-wrapper {
      line-height: 28px;
    }
  }
`;
