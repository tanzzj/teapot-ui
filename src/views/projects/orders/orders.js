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

export function _mergeOrder(data) {
    return request({
        url: '/api/project/order/mergeOrder',
        method: 'post',
        data
    })
}

export function _queryProjectOrderLogs(data) {
    return request({
        url: '/api/project/order/queryProjectOrderLogs',
        method: 'post',
        data
    })
}


export function _insertProjectOrderLogs(data) {
    return request({
        url: '/api/project/order/insertProjectOrderLogs',
        method: 'post',
        data
    })
}

export function _executeOrder(data) {
    return request({
        url: '/api/project/order/executeOrder',
        method: 'post',
        data
    })
}
