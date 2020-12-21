import request from "@/utils/request";

const url = "/common/upload";
export default {
    uploadFiles(data) {
        return request({
            url: `${url}`,
            method: "post",
            headers:{
                "Content-Type": "multipart/form-data;boundary = " + new Date().getTime()
            },
            data
        });
    },
};
