import request from "@/utils/request";
const url = "/ghback";
export default {
  getList (data) {
    return request({
      url: `${url}/patient/list`,
      method: "post",
      data: { ...data }
    });
  },
  create (data) {
    return request({
      url: `${url}/patient/create`,
      method: "post",
      data: {
        ...data
      }
    });
  },
  delete (ids) {
    return request({
      url: `${url}/patient/delete`,
      method: "post",
      data: {
        ids
      }
    });
  },
  update (data) {
    return request({
      url: `${url}/patient/update/${data.id}`,
      method: "post",
      data: {
        ...data
      }
    });
  },


  ///////////////////////
  updateState (state, id) {
    return request({
      url: `${url}/state/${id}`,
      method: "post",
      data: {
        state,
        type: "topic"
      }
    });
  },
  
  
  
};
