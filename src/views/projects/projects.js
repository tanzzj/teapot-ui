import request from '@util/request.js'

//查询项目列表
export function _queryProjectList(data) {
    return request({
        url: '/api/project/manager/queryProjectList',
        method: 'post',
        data
    })
}

//创建项目
export function _createProject(data) {
    return request({
        url: '/api/project/manager/createProject',
        method: 'post',
        data
    })
}
