import request from "@/utils/request";
const url = "/functions";
export default {
    getList (data) {
        return request({
            url: `${url}/list`,
            method: "post",
            data: { ...data }
        });
    },
    getDetail (id) {
        return request({
            url: `${url}/detail/${id}`,
            method: "post",
            data: {}
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
};
