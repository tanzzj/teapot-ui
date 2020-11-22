import request from '@util/request.js'

export function _queryProjectEnvironmentList(data) {
    return request({
        url: '/api/project/environment/queryProjectEnvironmentList',
        method: 'post',
        data
    })
}

export function _addProjectEnvironment(data) {
    return request({
        url: '/api/project/environment/addProjectEnvironment',
        method: 'post',
        data
    })
}
