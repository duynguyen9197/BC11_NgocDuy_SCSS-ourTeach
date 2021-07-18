/**
 * tạo method trả về true false
 * bên main tạo flag
 * nếu biến isvalid true thì cho phép thêm
 * flow
 * get value
 * check valid: get
 * tao user
 * post server
 */
function Validation() {
  this.kiemTraTrung = function (value, idMess, mess, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i].taiKhoan) {
        document.getElementById(idMess).innerHTML = mess;
        return false;
      }
    }
    document.getElementById(idMess).innerHTML = "";
    return true;
  };
  this.kiemTraRong = function (value, idMess, mess) {
    if (!value) {
      document.getElementById(idMess).innerHTML = mess;
      return false;
    }
    document.getElementById(idMess).innerHTML = "";
    return true;
  };

  this.kiemTraFormat = function (value, idMess, mess, regex) {
    var letter = regex;
    if (value.match(letter)) {
      document.getElementById(idMess).innerHTML = "";

      return true;
    }
    document.getElementById(idMess).innerHTML = mess;
    return false;
  };
  this.kiemTraKyTu = function (value, idMess, mess) {
    return this.kiemTraFormat(
      value,
      idMess,
      mess,
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
    );
  };
  this.kiemTraPass = function (value, idMess, mess) {
    return this.kiemTraFormat(
      value,
      idMess,
      mess,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
    );
  };
  this.kiemTraEmail = function (value, idMess, mess) {
    return this.kiemTraFormat(
      value,
      idMess,
      mess,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
  };
  this.kiemTraDoDaiKyTu = function (value, idMess, mess) {
    if (value.length > 60) {
      document.getElementById(idMess).innerHTML = mess;
      return false;
    }
    document.getElementById(idMess).innerHTML = "";
    return true;
  };
  this.kiemTraChon = function (idMess, mess, idSelected) {
    if (document.getElementById(idSelected).selectedIndex != 0) {
      document.getElementById(idMess).innerHTML = "";
      return true;
    }
    document.getElementById(idMess).innerHTML = mess;
    return false;
  };
}
