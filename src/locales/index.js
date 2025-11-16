import { jsx as _jsx } from "react/jsx-runtime";
import { FormattedMessage, useIntl } from 'react-intl';
import en_US from './en-US';
import zh_CN from './zh-CN';
export const localeConfig = {
    zh_CN: zh_CN,
    en_US: en_US,
};
export const LocaleFormatter = ({ ...props }) => {
    const notChildProps = { ...props, children: undefined };
    return _jsx(FormattedMessage, { ...notChildProps, id: props.id }, void 0);
};
export const useLocale = () => {
    const { formatMessage: _formatMessage, ...rest } = useIntl();
    const formatMessage = _formatMessage;
    return {
        ...rest,
        formatMessage,
    };
};
