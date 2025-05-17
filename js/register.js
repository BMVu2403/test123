const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
const btnRegister = document.querySelector(".btn-register");

btnRegister.onclick = function () {
    const username = document.querySelector("#username-input").value;
    const inputEmail = document.querySelector("#email-input").value;
    const inputPassword = document.querySelector("#password-input").value;
    const inputConfirmPass = document.querySelector("#passConfirm").value;
    console.log("username", username);
    console.log("inputEmail", inputEmail);
    console.log("inputPassword", inputPassword);
    console.log("inputConfirmPass", inputConfirmPass);

    // Validate email và mật khẩu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!username || !inputEmail || !inputPassword || !inputConfirmPass) {
        document.querySelector(".main-error").textContent = "Dữ liệu không được để trống";
        document.querySelector(".main-error").style.display = "block";
        document.querySelector("#username-input").classList.add("error-inform");
        document.querySelector("#email-input").classList.add("error-inform");
        document.querySelector("#password-input").classList.add("error-inform");
        document.querySelector("#passConfirm").classList.add("error-inform");
    } else {
        document.querySelector(".main-error").textContent = "";
        document.querySelector(".main-error").style.display = "none";
        document.querySelector("#username-input").classList.remove("error-inform");
        document.querySelector("#email-input").classList.remove("error-inform");
        document.querySelector("#password-input").classList.remove("error-inform");
        document.querySelector("#passConfirm").classList.remove("error-inform");
        // Kiểm tra định dạng tên người dùng

        if (emailRegex.test(inputEmail) && inputEmail.endsWith(".com")) {
            // EMail hơp lệ -> Kiểm tra định dạng mật khẩu
            if (passwordRegex.test(inputPassword)) {
                // Mật khẩu hợp lệ
                if (inputPassword === inputConfirmPass) {
                    // Mật khẩu xác nhận khớp
                    const findAccount = accounts.find((account) => account.userEmail === inputEmail);
                    console.log("findAccount", findAccount);
                    if (!findAccount) {
                        // Tạo tài khoản mới
                        const newAccount = {
                            id: accounts.length + 1,
                            username: username,
                            userEmail: inputEmail,
                            password: inputPassword,
                        };
                        accounts.push(newAccount);
                        localStorage.setItem('accountList', JSON.stringify(accounts));
                        reFresh();
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Đăng ký thành công",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        setTimeout(() => {
                            window.location.href = "login.html";
                        }, 1500);


                    } else {
                        document.querySelector(".main-error").textContent = "Tài khoản đã tồn tại";
                        document.querySelector(".main-error").style.display = "block";
                        document.querySelector("#username-input").classList.add("error-inform");
                        document.querySelector("#email-input").classList.add("error-inform");
                        document.querySelector("#password-input").classList.add("error-inform");
                        document.querySelector("#passConfirm").classList.add("error-inform");
                    }
                } else {
                    document.querySelector(".main-error").style.display = "block"
                    document.querySelector(".pass-error").style.display = "none";
                    document.querySelector(".email-error").style.display = "none"
                    document.querySelector(".main-error").textContent = "Mật khẩu xác nhận không đúng";
                    document.querySelector("#passConfirm").classList.add("error-inform");
                }

            } else {
                document.querySelector(".pass-error").style.display = "block";
                document.querySelector(".email-error").style.display = "none"

                document.querySelector(".pass-error").textContent = "Tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số, và ký tự đặc biệt.";
                document.querySelector("#password-input").classList.add("error-inform");
            }

        } else {
            document.querySelector(".email-error").style.display = "block"
            document.querySelector(".email-error").textContent = "Email không hợp lệ";
            document.querySelector("#email-input").classList.add("error-inform");
        }

    }



}

let currentIndex = 0;
const slides = document.querySelector('.slides');
const totalImages = document.querySelectorAll('.slides img').length;

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 3000); // đổi ảnh mỗi 3 giây

const inputList = document.querySelectorAll(".register-input input");

document.querySelector(".register-input input").onfocus = function () {
    document.querySelector(".main-error").textContent = "";
    document.querySelector(".main-error").textContent = "";
    document.querySelector(".email-error").textContent = "";
    document.querySelector(".pass-error").textContent = "";
    reFresh();

    document.querySelector("#username-input").classList.remove("error-inform");
    document.querySelector("#email-input").classList.remove("error-inform");
    document.querySelector("#password-input").classList.remove("error-inform");
    document.querySelector("#passConfirm").classList.remove("error-inform");
}
function reFresh() {
    document.querySelector(".main-error").style.display = "none";
    document.querySelector(".main-error").style.display = "none";
    document.querySelector(".email-error").style.display = "none";
    document.querySelector(".pass-error").style.display = "none";

    document.querySelector("#username-input").classList.remove("error-inform");
    document.querySelector("#email-input").classList.remove("error-inform");
    document.querySelector("#password-input").classList.remove("error-inform");
    document.querySelector("#passConfirm").classList.remove("error-inform");
}
