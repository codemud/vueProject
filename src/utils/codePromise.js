import router from "@/router";
import {removeToken,getLoginCode} from "./auth";

export function codePromise(code) {
    return new Promise(resolve => {
        let logoCode = new Set(getLoginCode());
        if (logoCode.has(code)) {
            removeToken();
            router.push("/login");
            resolve()
        } else if (code === 1000 || code === 1001 || code === 1003 || code === 1004 || code === 1005 || code === 1006 || code === 1007) {
            router.push("/");
            resolve()
        }
    })
}
