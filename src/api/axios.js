import axios from "axios";
import { Message } from "iview";
let router =
    import ("@/router");

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers["Cache-Control"] = "no-cache";
axios.defaults.headers["pragma"] = "no-cache";

let source = axios.CancelToken.source();

//请求添加token
axios.interceptors.request.use(request => {
    request.headers["ris-auth"] = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : "";
    return request;
});

//登录过期(token失效)跳转
axios.interceptors.response.use(response => {
    let data = response.data;
    if (
        data.state && [401].includes(data.state.code)
    ) {
        router.then(lib => {
            if (lib.default.currentRoute.name === "login") return;
            lib.default.push({
                name: "login"
            })
            Message.warning(data.state.msg);
        });
    }
    return response;
})

//返回值解构
axios.interceptors.response.use(response => {
    let data = response.data;
    let isJson = (response.headers["content-type"] || "").includes("json");
    if (isJson) {
        if (data.state && data.state.code === 200) {
            return Promise.resolve({
                data: data.data,
                msg: data.state.msg,
                code: data.state.code,
                page: data.page
            });
        }
        return Promise.reject(
            data.state &&
            data.state.msg ||
            "网络错误"
        );
    } else {
        return data;
    }
}, err => {
    let isCancel = axios.isCancel(err);
    if (isCancel) {
        return new Promise(() => {});
    }
    return Promise.reject(
        err.response.data &&
        err.response.data.state &&
        err.response.data.state.msg ||
        "网络错误"
    );
})

//切换页面取消请求
axios.interceptors.request.use(request => {
    request.cancelToken = source.token;
    return request;
});
router.then(lib => {
    lib.default.beforeEach((to, from, next) => {
        source.cancel()
        source = axios.CancelToken.source();
        next()
    })
})

export function post(url, data, otherConfig) {
    return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
    return axios.get(url, {
        params: data,
        ...otherConfig
    });
}