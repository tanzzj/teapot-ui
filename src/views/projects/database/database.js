import request from '@util/request.js'

export function _queryProjectDataBaseList(data) {
    return request({
        url: '/api/project/manager/database/queryProjectDataBaseList',
        method: 'post',
        data
    })
}
