import request from "@/utils/request";
const url = "/ghback";
export default {
  getList (data) {
    return request({
      url: `${url}/list`,
      method: "post",
      data: { ...data }
    });
  },
  // 这个获取所有父级列表
  getParentSorts () {
    return request({
      url: `${url}/parent`,
      method: "post"
    });
  },
  // 这个获取所有子级列表
  getChildSorts (id) {
    return request({
      url: `${url}/list`,
      method: "post",
      data: { pid: id, limit: 1000 }
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
  updateById (data) {
    return request({
      url: `${url}/update/${data.id}`,
      method: "post",
      data: {
        ...data
      }
    });
  },
  // 修改状态
  updateState (state, id) {
    return request({
      url: `${url}/state/${id}`,
      method: "post",
      data: {
        state
      }
    });
  },
  // 删除
  delete (ids) {
    return request({
      url: `${url}/delete`,
      method: "post",
      data: {
        ids: [ids]
      }
    });
  },
  // 查询分类的树状结构
  searchTree () {
    return request({
      url: `${url}/catetree`,
      method: "post"
    });
  },
  searchDocList (cate_id) {
    // 查询当前分类下的医生
    return request({
      url: `${url}/doctors/${cate_id}`,
      method: "post",
      data: {
        cate_id
      }
    });
  },
  setDocList (cate_id, dids) {
    // 设置医生
    return request({
      url: `${url}/setdoctors/${cate_id}`,
      method: "post",
      data: {
        cate_id,
        dids
      }
    });
  }
};
