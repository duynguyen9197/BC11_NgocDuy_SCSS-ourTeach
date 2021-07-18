function userService() {
  this.getUserServiceApi = function () {
    return axios({
      url: "https://60e7016815387c00173e49f3.mockapi.io/api/QLND",
      method: "GET",
    });
  };
  this.addUserServiceApi = function (user) {
    return axios({
      url: "https://60e7016815387c00173e49f3.mockapi.io/api/QLND",
      method: "POST",
      data: user,
    });
  };
  this.deleteUserServiceApi = function (id) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/QLND/${id}`,
      method: "DELETE",
    });
  };
  this.putUserService = function (user, id) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/QLND/${id}`,
      method: "PUT",
      data: user,
    });
  };
  this.getUSerById = function (id) {
    return axios({
      url: `https://60e7016815387c00173e49f3.mockapi.io/api/QLND/${id}`,
      method: "GET",
    });
  };
}
