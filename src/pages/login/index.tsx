// Your updated index.tsx
import type { LoginParams } from '@/interface/user/login';
import type { FC } from 'react';
import { useState } from 'react';

import './index.less';

import { Button, Form, Input, theme as antTheme, Spin, Space, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit'; // <-- Import unwrapResult

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';
import { loginAsync } from '../../stores/user.action';

const initialValues: LoginParams = {
  phone: '',
  password: '',
};

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { token } = antTheme.useToken();
  const [loading, setLoading] = useState(false);

  const onFinished = async (form: LoginParams) => {
    setLoading(true);
    try {
      // Dispatch the action and unwrap the result
      const result = await dispatch(loginAsync(form) as any);

      if (result.meta.requestStatus === 'fulfilled') {
        message.success('Login successful!');
        const search = formatSearch(location.search);
        const from = search.from || { pathname: '/' };
        navigate(from);
      } else {
        message.error(result.payload || 'Login failed');
      }
      
      // This code will only run if the login was SUCCESSFUL
      message.success('Login successful!');
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/' };
      navigate(from);

    } catch (err: any) {
      // This code will only run if the login FAILED
      message.error(err); // Display the error message from rejectWithValue
    } finally {
      // This will run regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: token.colorBgContainer }}>
      <Spin spinning={loading} tip="Logging in...">
        <Form<LoginParams> onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
          <h2>SWECHA CORPUS LOGIN</h2>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: formatMessage({ id: 'gloabal.tips.enterUsernameMessage' }) }]}
          >
            <Input
              placeholder={formatMessage({
                id: 'global.tips.phone',
              })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: formatMessage({ id: 'gloabal.tips.enterPasswordMessage' }) }]}
          >
            <Input.Password
              placeholder={formatMessage({
                id: 'gloabal.tips.password',
              })}
            />
          </Form.Item>
          <Form.Item>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button htmlType="submit" type="primary" className="login-page-form_button" block>
                <LocaleFormatter id="gloabal.tips.login" />
              </Button>
              <div style={{ textAlign: 'center' }}>
                <a onClick={() => navigate('/forgot-password')}>Forgot Password?</a>
                <span style={{ margin: '0 8px' }}>|</span>
                <a onClick={() => navigate('/signup')}>Create an account</a>
              </div>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default LoginForm;