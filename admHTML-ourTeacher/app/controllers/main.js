var service = new userService();
var valid = new Validation();
function getUserService() {
  service
    .getUserServiceApi()
    .then(function (result) {
      renderAdmin(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getUserService();

function renderAdmin(arrUser) {
  var contentAdm = "";
  arrUser.forEach(function (item, index) {
    contentAdm += `
        <tr>
        <td>${index + 1}</td>
        <td>
        ${item.taiKhoan}
        </td>
        <td>
        ${item.matKhau}
        </td>
        <td>
        ${item.hoTen}
        </td>
        <td>
        ${item.email}
        </td>
        <td>
        ${item.ngonNgu}
        </td>
        <td>
        ${item.loaiND}
        </td>
        <td>
        <button class="btn btn-danger" onclick="xoaUser(${
          item.id
        })">Xóa</button>
        <button class="btn btn-warning" data-toggle="modal"
        data-target="#myModal" onclick="editUser(${item.id})">sửa</button>
        </td>
       
        </tr>    
      `;
  });
  document.getElementById("tblDanhSachNguoiDung").innerHTML = contentAdm;
}
// Thêm user

document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm user";
    var btnAdd = `<button class="btn btn-success" onclick="AddUser()"> Thêm user</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  });
// Get value,Check Valid,instance class User function
async function createUser(id) {
  var _taiKhoan = document.getElementById("TaiKhoan").value;
  var _hoTen = document.getElementById("HoTen").value;
  var _matKhau = document.getElementById("MatKhau").value;
  var _email = document.getElementById("Email").value;
  var _hinhAnh = document.getElementById("HinhAnh").value;
  var _loaiND = document.getElementById("loaiNguoiDung").value;
  var _ngonNgu = document.getElementById("loaiNgonNgu").value;
  var _moTa = document.getElementById("MoTa").value;
  // check valid here
  var isValid = true;
  console.log(isValid);

  console.log(isValid);
  // ==_hoTen
  isValid &=
    valid.kiemTraRong(_hoTen, "messHoTen", "Không được để trống ô này !!!") &&
    valid.kiemTraKyTu(_hoTen, "messHoTen", "Sai định dạng !!!");
  console.log(isValid);
  // ==_matKhau
  isValid &=
    valid.kiemTraRong(
      _matKhau,
      "messMatKhau",
      "Không được để trống ô này !!!"
    ) && valid.kiemTraPass(_matKhau, "messMatKhau", "Mật khẩu sai format !!!");
  console.log(isValid);
  // // ==_email
  isValid &=
    valid.kiemTraRong(_email, "messEmail", "Không được để trống ô này !!!") &&
    valid.kiemTraEmail(_email, "messEmail", "Email sai format !!!");
  console.log(isValid);
  // // ==_hinhAnh
  isValid &= valid.kiemTraRong(
    _hinhAnh,
    "messHinhAnh",
    "Không được để trống ô này !!!"
  );
  // // ==_loaiND
  isValid &= valid.kiemTraChon(
    "messloaiNguoiDung",
    "Vui lòng chọn",
    "loaiNguoiDung"
  );
  // // ==_ngonNgu
  isValid &= valid.kiemTraChon(
    "messloaiNgonNgu",
    "Vui lòng chọn",
    "loaiNgonNgu"
  );
  console.log(isValid);
  // // ==_moTa
  isValid &=
    valid.kiemTraRong(_moTa, "messMoTa", "Không được để trống ô này !!!") &&
    valid.kiemTraDoDaiKyTu(_moTa, "messMoTa", "Không nhập quá 60 ký tự  !!!");
  console.log(isValid);
  // // =========================================
  // // kiem tra Trung Asyn Await
  var result = await service.getUserServiceApi();
  // ==taiKhoan
  isValid &=
    valid.kiemTraRong(
      _taiKhoan,
      "messTaiKhoan",
      "Không được để trống ô này !!!"
    ) &&
    valid.kiemTraTrung(
      _taiKhoan,
      "messTaiKhoan",
      "Tài Khoản Trùng !!!",
      result.data
    );

  console.log(isValid);
  // ==========
  if (isValid) {
    var user = new User(
      id,
      _taiKhoan,
      _hoTen,
      _matKhau,
      _email,
      _loaiND,
      _ngonNgu,
      _moTa,
      _hinhAnh
    );
    console.log(user);
    return user;
  }
}
// feature Thêm user
async function AddUser() {
  var user = await createUser("");
  if (!user) return;
  service
    .addUserServiceApi(user)
    .then(function () {
      getUserService();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//feature Xóa user
function xoaUser(id) {
  service
    .deleteUserServiceApi(id)
    .then(function () {
      getUserService();
      alert("delete success");
    })
    .catch(function (error) {
      console.log(error);
    });
}
//feature Sửa user
function editUser(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Update user";
  var btnAdd = `<button class="btn btn-success" onclick="UpdateUser(${id})"> Update user</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
  //   show user
  service
    .getUSerById(id)
    .then(function (result) {
      console.log(result.data);
      document.getElementById("TaiKhoan").value = result.data.taiKhoan;
      document.getElementById("HoTen").value = result.data.hoTen;
      document.getElementById("MatKhau").value = result.data.matKhau;
      document.getElementById("Email").value = result.data.email;
      document.getElementById("HinhAnh").value = result.data.hinhAnh;
      document.getElementById("loaiNguoiDung").value = result.data.loaiND;
      document.getElementById("loaiNgonNgu").value = result.data.ngonNgu;
      document.getElementById("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// feature Update User
async function UpdateUser(id) {
  var user = await createUser(id);
  if (!user) return;
  service
    .putUserService(user, id)
    .then(function () {
      alert("update success");
      document.getElementsByClassName("close")[0].click();
      getUserService();
    })
    .catch(function (error) {
      console.log(error);
    });
}
