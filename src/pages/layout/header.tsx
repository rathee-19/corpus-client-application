import type { FC } from 'react';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import AntdSvg from '@/assets/logo/antd.svg';
import ReactSvg from '@/assets/logo/react.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';
import HeaderNoticeComponent from './notice';
import { useEffect, useState } from 'react';
import { getCategoriesApi } from '../../api/categories.api';


const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  // make selector return the user slice, including userInfo and token
  const { logged, locale, device, userInfo, token } = useSelector((state: any) => state.user);
  // rename theme token variable so it doesn't conflict with auth token names
  const { theme } = useSelector((state: any) => state.global);
  const themeToken = antTheme.useToken();
  const { token: themeTokens } = themeToken;

  const dispatch = useDispatch();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (logged && token) {
      getCategoriesApi(token)
        .then(res => {
          setCategories(res.data);
        })
        .catch(err => {
          console.error('Failed to fetch categories:', err);
        });
    }
  }, [logged, token]);

  const navigate = useNavigate();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));
        res && navigate('/login');
        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = themeTokens?.colorBgContainer && themeTokens?.colorBgContainer === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: themeTokens.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt="" style={{ marginRight: collapsed ? '2px' : '20px' }} />
          <img src={AntdSvg} alt="" />
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className="actions">
          <Tooltip
          title={formatMessage({
            id: theme === 'dark'
              ? 'gloabal.tips.theme.lightTooltip'
              : 'gloabal.tips.theme.darkTooltip',
          })}
          
          >
            <span>
              {createElement(themeTokens ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>
          <HeaderNoticeComponent />
          <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: '简体中文',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <LanguageSvg id="language-change" />
            </span>
          </Dropdown>
          <Dropdown
  menu={{
    items: categories.map(cat => ({
      key: cat.id,
      label: cat.title || cat.name,
    })),
  }}
  onOpenChange={(open) => {
    if (open && token) {
      getCategoriesApi(token)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => {
          console.error('Failed to fetch categories:', err);
        });
    }
  }}
>
  <span style={{ marginRight: '16px', cursor: 'pointer' }}>
    Categories
  </span>
</Dropdown>


          {logged ? (
  <Dropdown
    menu={{
      items: [
        {
          key: '1',
          icon: <UserOutlined />,
          label: (
            <span onClick={() => navigate('/dashboard')}>
              {userInfo?.name || <LocaleFormatter id="header.avator.account" />}
            </span>
          ),
        },
        {
          key: '2',
          icon: <LogoutOutlined />,
          label: (
            <span onClick={() => onActionClick('logout')}>
              <LocaleFormatter id="header.avator.logout" />
            </span>
          ),
        },
      ],
    }}
  >
    <span className="user-action">
      <img src={Avator} className="user-avator" alt="avator" />
      <span style={{ marginLeft: '8px' }}>
        {userInfo?.name || 'User'}
      </span>
    </span>
  </Dropdown>
) : (
  <span style={{ cursor: 'pointer' }} onClick={toLogin}>
    {/* {formatMessage({ id: 'gloabal.tips.login' })} */}
    Rohan
  </span>
)}

        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
