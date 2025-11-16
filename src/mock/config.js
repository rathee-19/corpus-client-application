import Mock from 'mockjs';
import { getTableData } from '@/utils/get-table-page-data';
Mock.setup({
    timeout: 300,
});
export function intercepter(data, page) {
    if (page) {
        const result = getTableData(Number(page.pageNum), Number(page.pageSize), data);
        return {
            status: true,
            message: '成功',
            result,
        };
    }
    else {
        return {
            status: true,
            message: '成功',
            result: data,
        };
    }
}
export const mock = Mock;
