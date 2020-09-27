import request from "@/utils/request";

// 登录
export function login(name, password, remember) {
    return request({
        url: "/ghback/login",
        method: "post",
        data: {
            name,
            password,
            remember
        }
    });
}

// 登出
export function logout() {
    return request({
        url: "logout",
        method: "post"
    });
}

// 修改密码
export function updatePassword(data) {
    return request({
        url: "/ghback/sys/users/setpwd",
        method: "post",
        data
    });
}
