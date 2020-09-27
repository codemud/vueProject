import request from "@/utils/request";
const url = "/ghback";
export default {
  getList (data) {
    return request({
      url: `${url}/order/list`,
      method: "post",
      data: { ...data }
    });
  },
  getOrderDetail (id) {
    return request({
      url: `${url}/order/detail/${id}`,
      method: "post"
    });
  },
};
