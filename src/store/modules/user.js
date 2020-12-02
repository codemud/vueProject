import {
    getToken,
    setToken,
    removeToken,
    setUser,
    getUser,
    setSex,setState,setLevel,setProfession,setLoginCode,setWorkTime
} from "@/utils/auth";
import {login, logout} from "@/api/login";

export default {
    state: {
        token: getToken() || "",
        user: getUser() || {}
    },
    mutations: {
        SET_TOKEN(state, val) {
            state.token = val;
            setToken(val);
        },
        SET_USER(state, val) {
            state.user = val;
            setUser(val);
        }
    },
    actions: {
        loginin({commit}, msg) {
            //登录
            return new Promise(resolve => {
                login(...msg).then(response => {
                    let res = response.data;
                    res && commit("SET_TOKEN", res.access_token);
                    res && commit("SET_USER", res.config.userInfo);
                    res && setSex(res.config.sexInfo);
                    res && setState(res.config.statusInfo);
                    res && setLoginCode(res.config.loginCode);
                    res && setProfession(res.config.professionInfo);
                    res && setLevel(res.config.levelInfo);
                    resolve(res);
                });
            });
        },
        loginout() {
            //登出
            return new Promise(resolve => {
                removeToken();
                resolve("退出成功");
                // logout().then(response => {
                //     let res = response.data;
                //     res && removeToken();
                //     resolve(res);
                // });
            });
        }
    },
    getters: {
        getUserToken: (state) => {
            return state.token
        }
    }
};
