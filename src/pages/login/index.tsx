// src/pages/login/index.tsx
import type { FC } from 'react';
import type { LoginParams } from '@/interface/user/login';
import { useEffect, useState } from 'react';

import './index.less';

import { Button, Form, Input, Spin, Space, message, theme as antTheme } from 'antd';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import { LocaleFormatter, useLocale } from '@/locales';
import { formatSearch } from '@/utils/formatSearch';
import { loginAsync } from '@/stores/user.action';

const initialValues: LoginParams = {
  phone: '',
  password: '',
};

const LoginForm: FC = () => {
  console.log('[LoginPage] mounted; token=', localStorage.getItem('token'));

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();
  const { token } = antTheme.useToken();
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to home immediately
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const onFinished = async (form: LoginParams) => {
    setLoading(true);
    try {
      // dispatch async thunk and unwrap result to throw on rejection
      const actionResult = await dispatch(loginAsync(form) as any);
      const payload = unwrapResult(actionResult); // throws if rejected
        
      // success
      message.success('Login successful!');
      const search = formatSearch(location.search);
      // `formatSearch` may return from as string or object; normalize to string path
      const fromPath = (search?.from && (typeof search.from === 'string' ? search.from : (search.from as any).pathname)) || '/';
      navigate(fromPath, { replace: true });
    } catch (err: any) {
      // unwrapResult throws or thunk may reject; show a readable message
      const msg =
        typeof err === 'string'
          ? err
          : err?.message || err?.payload || 'Login failed. Please check your credentials.';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundColor: token.colorBgContainer }}>
      <Spin spinning={loading} tip="Logging in...">
        <Form<LoginParams> onFinish={onFinished} className="login-page-form" initialValues={initialValues}>
          <h2>Corpus Client — Sign in</h2>

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
