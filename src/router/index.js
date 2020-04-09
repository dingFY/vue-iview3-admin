import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/mainPage'
import Login from '../views/login'

Vue.use(VueRouter)

// 主页面MainPage下面的子页面
let pages = [
    'home',
    'prisonerManager',
    'user',
    'test'
].map(name => ({
    path: name,
    name: name,
    component: () =>
        import (`@/views/${name}`)
}))

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'mainPage',
            component: MainPage,
            children: pages,
            meta: {
                requiresAuth: true // 访问该路由时需要判断是否登录
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
    ]
})
export default router