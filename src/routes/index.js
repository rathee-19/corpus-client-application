import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';
import Dashboard from '@/pages/dashboard';
import LayoutPage from '@/pages/layout';
import LoginPage from '@/pages/login';
import WrapperRouteComponent from './config';
const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/404'));
const Documentation = lazy(() => import(/* webpackChunkName: "404'"*/ '@/pages/doucumentation'));
const Guide = lazy(() => import(/* webpackChunkName: "guide'"*/ '@/pages/guide'));
const RoutePermission = lazy(() => import(/* webpackChunkName: "route-permission"*/ '@/pages/permission/route'));
const FormPage = lazy(() => import(/* webpackChunkName: "form'"*/ '@/pages/components/form'));
const TablePage = lazy(() => import(/* webpackChunkName: "table'"*/ '@/pages/components/table'));
const SearchPage = lazy(() => import(/* webpackChunkName: "search'"*/ '@/pages/components/search'));
const TabsPage = lazy(() => import(/* webpackChunkName: "tabs'"*/ '@/pages/components/tabs'));
const AsidePage = lazy(() => import(/* webpackChunkName: "aside'"*/ '@/pages/components/aside'));
const RadioCardsPage = lazy(() => import(/* webpackChunkName: "radio-cards'"*/ '@/pages/components/radio-cards'));
const BusinessBasicPage = lazy(() => import(/* webpackChunkName: "basic-page" */ '@/pages/business/basic'));
const BusinessWithSearchPage = lazy(() => import(/* webpackChunkName: "with-search" */ '@/pages/business/with-search'));
const BusinessWithAsidePage = lazy(() => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-aside'));
const BusinessWithRadioCardsPage = lazy(() => import(/* webpackChunkName: "with-aside" */ '@/pages/business/with-radio-cards'));
const BusinessWithTabsPage = lazy(() => import(/* webpackChunkName: "with-tabs" */ '@/pages/business/with-tabs'));
const routeList = [
    {
        path: '/login',
        element: _jsx(LoginPage, {}, void 0),
    },
    {
        path: '/',
        element: _jsx(WrapperRouteComponent, { element: _jsx(LayoutPage, {}, void 0), auth: true }, void 0),
        children: [
            {
                path: '',
                element: _jsx(Navigate, { to: "dashboard" }, void 0),
            },
            {
                path: 'dashboard',
                element: _jsx(WrapperRouteComponent, { element: _jsx(Dashboard, {}, void 0), titleId: "title.dashboard" }, void 0),
            },
            {
                path: 'documentation',
                element: _jsx(WrapperRouteComponent, { element: _jsx(Documentation, {}, void 0), titleId: "title.documentation" }, void 0),
            },
            {
                path: 'guide',
                element: _jsx(WrapperRouteComponent, { element: _jsx(Guide, {}, void 0), titleId: "title.guide" }, void 0),
            },
            {
                path: 'permission/route',
                element: _jsx(WrapperRouteComponent, { element: _jsx(RoutePermission, {}, void 0), titleId: "title.permission.route" }, void 0),
            },
            {
                path: 'component/form',
                element: _jsx(WrapperRouteComponent, { element: _jsx(FormPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'component/table',
                element: _jsx(WrapperRouteComponent, { element: _jsx(TablePage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'component/search',
                element: _jsx(WrapperRouteComponent, { element: _jsx(SearchPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'component/tabs',
                element: _jsx(WrapperRouteComponent, { element: _jsx(TabsPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'component/aside',
                element: _jsx(WrapperRouteComponent, { element: _jsx(AsidePage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'component/radio-cards',
                element: _jsx(WrapperRouteComponent, { element: _jsx(RadioCardsPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'business/basic',
                element: _jsx(WrapperRouteComponent, { element: _jsx(BusinessBasicPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'business/with-search',
                element: _jsx(WrapperRouteComponent, { element: _jsx(BusinessWithSearchPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'business/with-aside',
                element: _jsx(WrapperRouteComponent, { element: _jsx(BusinessWithAsidePage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'business/with-radio-cards',
                element: _jsx(WrapperRouteComponent, { element: _jsx(BusinessWithRadioCardsPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: 'business/with-tabs',
                element: _jsx(WrapperRouteComponent, { element: _jsx(BusinessWithTabsPage, {}, void 0), titleId: "title.account" }, void 0),
            },
            {
                path: '*',
                element: _jsx(WrapperRouteComponent, { element: _jsx(NotFound, {}, void 0), titleId: "title.notFount" }, void 0),
            },
        ],
    },
];
const RenderRouter = () => {
    const element = useRoutes(routeList);
    return element;
};
export default RenderRouter;
