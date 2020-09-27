import request from "@/utils/request";
const url = "/advert";
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
  updateState (state, id) {
    return request({
      url: `${url}/state/${id}`,
      method: "post",
      data: {
        state
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
  }
};
