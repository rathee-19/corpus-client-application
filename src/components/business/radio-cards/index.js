import { jsx as _jsx } from "react/jsx-runtime";
import { css } from '@emotion/react';
import MyRadio from '@/components/basic/radio';
const MyRadioCards = props => {
    const { options, ...rest } = props;
    return (_jsx("div", { css: styles, children: _jsx(MyRadio.Group, { buttonStyle: "solid", ...rest, children: options?.map(option => (_jsx(MyRadio.Button, { style: { width: `calc(100% / ${options.length})` }, value: option.value, children: option.label }, option.value))) }, void 0) }, void 0));
};
export default MyRadioCards;
const styles = css `
  padding: 8px;
  .ant-radio-group {
    width: 100%;
    display: flex;
  }
  .ant-radio-button-wrapper {
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .ant-radio-button {
  }
`;
