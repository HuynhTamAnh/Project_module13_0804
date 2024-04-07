document.addEventListener("DOMContentLoaded", function () {
  // Mong muốn của chúng ta
  Validator({
    form: "#form-1",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    rules: [Validator.isEmail("#email"), Validator.minLength("#password", 6)],

    onSubmit: function (data) {
      let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
      // Lấy dữ liệu từ form
      let email = data.email;
      let password = data.password;
      let newUser = { email, password };
      const admin = [
        {
          email: "admin@gmail.com",
          password: "123456",
        },
      ];

      // Đăng nhập vào admin = tài khoản có sẵn
      for (let ad of admin) {
        if (equalUser(newUser, ad)) {
          alert("Đăng nhập thành công với quyền admin ");
          window.localStorage.setItem("admin", true);
          window.location.href = "/pages/admin/admin.html";
          return false;
        }
      }

      let foundUser = listUsers.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (foundUser) {
        // Lưu email vào localStorage
        localStorage.setItem("userEmail", foundUser.email);

        if (isAdmin(foundUser)) {
          alert("Đăng nhập thành công với quyền admin");
          window.location.href = "/pages/admin/admin.html";
        } else {
          if (foundUser.isLocked) {
            alert("Tài khoản của bạn đã bị khóa và không thể đăng nhập.");
          } else {
            alert("Đăng nhập thành công");
            window.location.href = "/index.html";
          }
        }
      } else {
        alert("Email hoặc mật khẩu không chính xác");
      }
    },
  });
});
function equalUser(user1, user2) {
  return user1.email === user2.email && user1.password == user2.password;
}

function isAdmin(user) {
  return user.role === "admin"; // Thay đổi "admin" thành vai trò quản trị viên trong hệ thống của bạn
}

localStorage.setItem("admin", JSON.stringify(admin));
