import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import auth from '@/utils/auth';
// import '@/assets/css/common.scss' /*引入公共样式*/

Vue.config.productionTip = false
Vue.use(iview)
Vue.directive("auth", auth);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')