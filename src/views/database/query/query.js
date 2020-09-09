import request from '@util/request.js'

//执行sql查询
export function _executeSQL(data) {
    return request({
        url: '/api/project/manager/database/executeSQL',
        method: 'post',
        data
    })
}
