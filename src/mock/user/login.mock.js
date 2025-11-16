import { intercepter, mock } from '../config';
mock.mock('/user/login', 'post', (config) => {
    const body = JSON.parse(config?.body);
    return intercepter({
        token: '123abcdefg',
        username: body?.username,
        role: body?.username,
        user_id: '1',
    });
});
