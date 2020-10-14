import axios from "axios";
import {Message} from "element-ui";
import {getToken} from "./auth";
import {codePromise} from "./codePromise";
import {close} from './NProgress'


const request = axios.create({
    baseURL: "/backstage",
    timeout: 20000, // 请求超时
    headers: {
        Accept: "application/vnd.adminapi.v1+json"
    }
});

// 请求拦截器
request.interceptors.request.use(
    config => {
        config.headers.Authorization = getToken() ? "Bearer " + getToken() : "";
        return config;
    },
    error => {
        close();
        return Promise.reject(error);
    }
);

// 响应请求
request.interceptors.response.use(
    response => {
        console.log(response,'ssss')
        let res = response.data;
        if (res.code !== 200) {
            codePromise(res.code && res.code);
            return Message({
                message: res.message || res.msg,
                type: "warning",
                duration: 2000
            });
        }
        close();
        return res;
    },
    error => {
        let res = error && error.response;
        let msg = "啊哦~系统出错了，请重新刷新页面哟!";
        if (res) {
            switch (res.status) {
                case 500:
                    msg = "未完成的请求，服务器遇到了一个意外";
                    break;
                case 404:
                    msg = "服务器无法找到所请求的页面。";
                    break;
            }
            codePromise(res.data && res.data.code);
        }
        Message({
            message: msg,
            type: "warning",
            duration: 2000
        });
        close();
        return Promise.reject(error);
    }
);

export default request;
