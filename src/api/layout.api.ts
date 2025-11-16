import type { MenuList } from '../interface/layout/menu.interface';
import type { Notice } from '@/interface/layout/notice.interface';
import type { AxiosRequestConfig } from 'axios';

import { request } from './request';


export const getNoticeList = async () => {
    return {
      status: true,
      result: []
    };
  };