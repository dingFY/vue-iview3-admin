import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginInfo: {},
    },
    mutations: {
        setLoginInfo(state, data) {
            state.loginInfo = data;
        },
    },
    actions: {},
    modules: {}
})