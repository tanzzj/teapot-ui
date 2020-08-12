import request from '@util/request.js'

//查询数据库实例列表
export function _queryDatabaseList(data) {
    return request({
        url: '/api/datasource/manager/queryDatabaseList',
        method: 'post',
        data
    })
}

export function _addDatabase(data) {
    return request({
        url: '/api/datasource/manager/addDatabase',
        method: 'post',
        data
    })
}
