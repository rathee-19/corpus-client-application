import { request } from './request';
export const getBusinessUserList = (params) => request('get', '/business/list', params);
