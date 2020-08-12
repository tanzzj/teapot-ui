import request from '@util/request.js'

//登录
export function _login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}