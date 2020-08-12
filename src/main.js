import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import tab from '@components/tab/tab.vue'
import headBar from '@components/header/headBar.vue'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(router)
Vue.config.productionTip = false

Vue.component("tab", tab);
Vue.component("headBar", headBar)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
