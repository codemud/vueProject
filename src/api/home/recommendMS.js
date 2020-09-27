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
        ids: [ids]
      }
    });
  }
};
