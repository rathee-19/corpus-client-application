import { jsx as _jsx } from "react/jsx-runtime";
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/locales';
const NotFoundPage = () => {
    const navigate = useNavigate();
    const { formatMessage } = useLocale();
    return (_jsx(Result, { status: "404", title: "404", subTitle: formatMessage({ id: 'gloabal.tips.notfound' }), extra: _jsx(Button, { type: "primary", onClick: () => navigate('/'), children: formatMessage({ id: 'gloabal.tips.backHome' }) }, void 0) }, void 0));
};
export default NotFoundPage;
