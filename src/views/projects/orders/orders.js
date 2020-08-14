import request from '@util/request.js'

export function _queryProjectOrderList(data) {
    return request({
        url: '/api/project/order/queryProjectOrderList',
        method: 'post',
        data
    })
}

export function _queryProjectOrderDetails(data) {
    return request({
        url: '/api/project/order/queryProjectOrderDetails',
        method: 'post',
        data
    })
}

export function _createProjectOrder(data) {
    return request({
        url: '/api/project/order/createProjectOrder',
        method: 'post',
        data
    })
}
