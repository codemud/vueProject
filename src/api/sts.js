import request from "@/utils/request";

const url = "/ghback/aliyun"
export default {
    getSTS(data) {
        return request({
            url: `${url}/osscert`,
            method: "post",
            data: {
                ...data
            }
        });
    },
};
