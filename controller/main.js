var service = new userService();
function getUserService() {
  service
    .getUserServiceApi()
    .then(function (result) {
      console.log(result.data);
      render(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getUserService();
// SASS
function render(arrUser) {
  var content = "";
  for (var i = 0; i < arrUser.length; i++) {
    if (arrUser[i].loaiND == "GV") {
      content += `
        <div class="col-lg-3 col-6">
            <div class="teacher_item">
              <img src="./images/${arrUser[i].hinhAnh}" />
              <div class="teacher_text">
                <span>${arrUser[i].ngonNgu}</span>
                <h1>${arrUser[i].hoTen}</h1>
                <p>
                ${arrUser[i].moTa}
                </p>
              </div>
            </div>
         </div>
            `;
    }

    // console.log(arrUser.moTa);
  }
  document.getElementById("listTeacher").innerHTML = content;
  console.log(content);
}
// ADMIN
