import request from "@/utils/request";
const url = "/baseMs";
export default {
    getList (data) {
        return request({
            url: `${url}/list`,
            method: "post",
            data: { ...data }
        });
    },
    delete (ids) {
        return request({
            url: `${url}/delete`,
            method: "post",
            data: {
                ids
            }
        });
    },
    update (data) {
        return request({
            url: `${url}/update/${data.id}`,
            method: "post",
            data: {
                ...data
            }
        });
    },
    create (data) {
        return request({
            url: `${url}/create`,
            method: "post",
            data: {
                ...data
            }
        });
    },
    getParentsList () {  // 上级科室
        return request({
            url: `${url}/parents`,
            method: "post"
        });
    }
};
