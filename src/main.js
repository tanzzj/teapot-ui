import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import tab from '@components/tab/tab.vue'
import headBar from '@components/header/headBar.vue'
import filters from '@util/filters'
import 'element-ui/lib/theme-chalk/index.css';
import '@style/global.css'
import PageParams from "@/model/PageParams";

Vue.use(ElementUI);
Vue.use(router)
Vue.config.productionTip = false

Vue.component("tab", tab);
Vue.component("headBar", headBar)
// 注册全局过滤器
for (let key in filters) {
    Vue.filter(key, filters[key])
}
// 全局方法
for (let key in filters) {
    Vue.prototype[key] = filters[key]
}

Vue.prototype.PageParams = PageParams
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
