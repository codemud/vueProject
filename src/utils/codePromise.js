import router from "@/router";
import {removeToken,getLoginCode} from "./auth";

export function codePromise(code) {
    return new Promise(resolve => {
        let logoCode = new Set(getLoginCode());
        if (logoCode.has(code)) {
            removeToken();
            router.push("/login");
            resolve()
        }
        // else {
        //     router.push("/");
        //     resolve()
        // }
    })
}
