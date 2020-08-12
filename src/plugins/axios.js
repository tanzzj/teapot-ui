"use strict"

import Vue from "vue"
import axios from "axios"
import cache from "./cache"
import common from "./common"
import router from "../router"
import { Notify } from "vant"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const fetch = axios.create({
    baseURL: process.env.VUE_APP_apiUrl || "",
    timeout: 6000 * 3, // Timeout
    message: false, //默认关闭message提示
    withCredentials: true, // Check cross-site Access-Control
})
fetch.interceptors.request.use(requestSuccess, requestError)

// Add a response interceptor
fetch.interceptors.response.use(responseSuccess, responseError)
Plugin.install = function(Vue) {
    Vue.prototype.$axios = fetch
}
export default fetch

Vue.use(Plugin)

/**
 * 请求成功前的回调
 * @param config
 * @returns {*}
 */
function requestSuccess(config) {
    // Do something before request is sent

    /*config.headers = Object.assign(config.headers,common.getSignatureParam())*/
    return config
}

/**
 * 请求前失败的回调
 * @param error
 * @returns {Promise<never>}
 */
function requestError(error) {
    return Promise.reject(error)
}

/**
 * 请求成功后的回调
 * @param res
 * @returns {*}
 */
function responseSuccess(res) {
    let data = res.data
    if (data.result !== "success") {
        if (data.code === '401') {
            if (cache.get("userInfo")) {
                Notify("登录验证超时，请重新登录！")
            } else {
                Notify("您尚未登录，请先登录！")
            }
            cache.clear()
            router.push("/login")
        } else {
            Notify(data.message)
        }
        return Promise.reject(data.message || "Error")
    } else {
        return data
    }
}

/**
 * 请求失败后的回调
 * @param error
 * @returns {Promise<never>}
 */
function responseError(error) {
    let request = error.request
    if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        Notify("网络异常，状态码:" + request.status)
    } else {
        // Something happened in setting up the request that triggered an Error
        Notify("网络异常，请稍后再试")
    }
    return Promise.reject(error)
}
