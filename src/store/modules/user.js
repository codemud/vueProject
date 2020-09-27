import {
    getToken,
    setToken,
    removeToken,
    setUser,
    getUser,
    setMenberCert,setYuYue,setGHtype,
    setSex,setState,setGhState,setLevel,setProperty,setHitype,setBdnature,setProfession,setLoginCode,setArea,setWorkTime,setDoctorWorkState
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
                    res && commit("SET_USER", res.config.userinfo);
                    setSex(res.config.sex);
                    setState(res.config.state);
                    setArea(res.config.areas);
                    setGhState(res.config.gh_state);
                    setLevel(res.config.level);
                    setProperty(res.config.property);
                    setHitype(res.config.hi_type);
                    setBdnature(res.config.bd_nature);
                    setProfession(res.config.profession);
                    setLoginCode(res.config.logincode);
                    setMenberCert(res.config.gh_member_cert);
                    setYuYue(res.config.gh_yuyue);
                    setWorkTime(res.config.gh_work_time);
                    setDoctorWorkState(res.config.gh_doctor_work_state);
                    setGHtype(res.config.gh_hospital_type);
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
