import Layout from "@/views/Layout";
import store from "../../store/modules/user";
import mainMenu from "./main";

export default () => {
    const menuList = process.env.VUE_APP_MENU_TYPE === 'local'?mainMenu:(store.state.user.menu || []);
    let main = [];
    menuList.forEach(e => {
        let arry = {
            path: e.path,
            component: Layout,
            meta: {
                parentName: e.name,
                icon: e.icon
            },
            children: e.children.map(m => ({
                path: m.path,
                name: m.name,
                component: () => import(`@/views/main${m.path}`),
                meta: {
                    parentName: e.name
                }
            }))
        };
        main.push(arry);
    });
    return main;
};
