import request from "@/utils/request";

const url = "/ghback";
export default {
    getList(data) {
        return request({
            url: `${url}/hospitals/list`,
            method: "post",
            data: {...data}
        });
    },
    getAreaList() {
        return request({
            url: `${url}/areas/trees`,
            method: "post",
        });
    },
    update(data) {
        return request({
            url: `${url}/hospitals/update/${data.id}`,
            method: "post",
            data: {
                ...data
            }
        });
    },
    create(data) {
        return request({
            url: `${url}/hospitals/create`,
            method: "post",
            data: {
                ...data
            }
        });
    },
    delete(ids) {
        return request({
            url: `${url}/hospitals/delete`,
            method: "post",
            data: {
                ids
            }
        });
    },
    updateState(state, id) {
        return request({
            url: `${url}/state/${id}`,
            method: "post",
            data: {
                state,
                type: "topic"
            }
        });
    },
    getHospitalsList() {
        return request({
            url: `${url}/hospitals/all`,
            method: "post",
            data: {}
        });
    }
};
