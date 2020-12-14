import request from "@/utils/request";
const url = "/ghback/workrecord";
export default {
    updateNotify (hospital_id,doctor_id,date,state) {
        return request({
            url: `${url}/notify/${hospital_id}/${doctor_id}/${date}/${state}`,
            method: "post",
            data: {}
        });
    },
    update (data) {
        return request({
            url: `${url}/update`,
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
    getWorkTimeList (hospitalid,doctorid) {
        return request({
            url: `${url}/list/${hospitalid}/${doctorid}`,
            method: "post"
        });
    }
};
