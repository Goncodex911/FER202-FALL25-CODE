import movieApi from "./movieAPI";

export const authApi = {
  async login(username, password) {
    // json-server cho phép filter dữ liệu bằng cách truyền params
    const res = await movieApi.get('/accounts', {
      params: { username, password },
    });
    // dùng để trả mảng về
    if (res.data && res.data.length > 0) {
      return res.data[0]; // account đầu tiên
    }
    return null;
  },
};