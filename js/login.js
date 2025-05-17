// const accounts = [
//     {
//         id: 1,
//         username: "Nguyen Van A",
//         userEmail: "nva@gmail.com",
//         password: "Nva@1234",
//     },
//     {
//         id: 2,
//         username: "Nguyen Van B",
//         userEmail: "nvc@gmail.com",
//         password: "Nvb@1234",
//     },
//     {
//         id: 3,
//         username: "Nguyen Van C",
//         userEmail: "nvc@gmail.com",
//         password: "Nvc@1234",
//     },
//     {
//         id: 4,
//         username: "Nguyen Van D",
//         userEmail: "nvd@gmail.com",
//         password: "Nvd@1234",
//     }
// ]
const accounts = JSON.parse(localStorage.getItem("accountList")) || [];
// localStorage.setItem("accountList", JSON.stringify(accounts))
const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
const notedAccount = JSON.parse(localStorage.getItem("rememberAccount")) || "";
const rememberStatus = JSON.parse(localStorage.getItem("rememberStatus")) || "";
console.log("notedAccount", notedAccount);
console.log("rememberStatus", rememberStatus);


const loginButton = document.querySelector("#btn-login");
console.log(loginButton);
console.log(loginStatus);

if (loginStatus) {
    window.location.href = "../html/index.html"
} else {
    if (rememberStatus) {
        document.querySelector("#user-email-input").value = notedAccount.userEmail;
        document.querySelector("#password-input").value = notedAccount.password
    } else {
        document.querySelector("#user-email-input").value = "";
        document.querySelector("#password-input").value = "";
    }

    loginButton.onclick = function () {
        const inputEmail = document.querySelector("#user-email-input").value;
        const inputPassword = document.querySelector("#password-input").value;
        const rememberAccount = document.querySelector("#rememberAccount");
        console.log("inputEmail", inputEmail);
        console.log("inputPassword", inputPassword);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        //  Validate email và mật khẩu
        if (emailRegex.test(inputEmail)) {
            // email hợp lệ
            const findACcount = accounts.find((account) => account.userEmail === inputEmail);
            console.log("findACcount", findACcount);
            if (passwordRegex.test(inputPassword)) {
                // Mật khẩu hợp lệ --> tiến hành check exit

                if (findACcount) {
                    document.querySelector("#user-email-input").classList.remove("error");
                    document.querySelector("#password-input").classList.remove("error");
                    if (findACcount.password === inputPassword) {
                        if (rememberAccount.checked) {
                            localStorage.setItem("rememberStatus", JSON.stringify(true));
                            localStorage.setItem("rememberAccount", JSON.stringify(findACcount));
                        } else {
                            localStorage.setItem("rememberStatus", JSON.stringify(false));
                            localStorage.removeItem("rememberAccount");
                        }
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Đăng nhập thành công",
                            showConfirmButton: false,
                            timer: 900
                        });
                        setTimeout(() => {
                            window.location.href = "index.html";
                            localStorage.setItem("loginStatus", JSON.stringify(true));
                            // set logingAccount = tài khoản tìm thấy
                            localStorage.setItem("logingAccount", JSON.stringify(findACcount));

                            document.querySelector("#user-email-input").value = "";
                            document.querySelector("#password-input").value = "";
                        }, 900);

                    } else {
                        document.querySelector(".error-inform").style.display = "block";
                        document.querySelector("#password-input").classList.add("error");
                        document.querySelector(".error-inform").textContent = "Mật khẩu không đúng";
                    }
                } else {
                    document.querySelector(".error-inform").style.display = "block";
                    document.querySelector("#user-email-input").classList.add("error");
                    document.querySelector("#password-input").classList.add("error");
                    document.querySelector(".error-inform").textContent = "Tài khoản không tồn tại";

                }
            } else {
                document.querySelector(".error-inform").style.display = "block";
                document.querySelector("#password-input").classList.add("error");
                document.querySelector(".error-inform").textContent = "Tối thiểu 8 ký tự, gồm chữ thường, chữ hoa, số, và ký tự đặc biệt.";
            }

        } else {
            document.querySelector(".error-email").style.display = "block";
            document.querySelector("#user-email-input").classList.add("error");
            document.querySelector(".error-email").textContent = "Email không hợp lệ";
        }
    }

    document.querySelector("#user-email-input").onkeyup = function () {
        const inputEmail = document.querySelector("#user-email-input").value;
        const inputPassword = document.querySelector("#password-input").value;
        if (inputEmail === "" || inputPassword === "") {
            document.querySelector("#user-email-input").classList.remove("error");
            document.querySelector("#password-input").classList.remove("error");
            document.querySelector(".error-inform").textContent = "";
            document.querySelector(".error-email").textContent = "";

        }
    }
    document.querySelector("#password-input").onkeyup = function () {
        const inputEmail = document.querySelector("#user-email-input").value;
        const inputPassword = document.querySelector("#password-input").value;
        if (inputEmail === "" || inputPassword === "") {
            document.querySelector("#user-email-input").classList.remove("error");
            document.querySelector("#password-input").classList.remove("error");
            document.querySelector(".error-inform").textContent = "";
            document.querySelector(".error-email").textContent = "";

        }
    }

    const logoPhen = document.querySelector(".logo_Phe");
    logoPhen.style = "cursor: pointer";
    logoPhen.onclick = () => {
        window.location.href = "../html/Home-page.html";
    }
}




