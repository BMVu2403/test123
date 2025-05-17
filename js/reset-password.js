
const accountList = JSON.parse(localStorage.getItem("accountList"));
document.getElementById("btn-next").addEventListener("click", function () {
    const emailInput = document.getElementById("reset-email-input");
    const emailError = document.getElementById("email-error");
    const passwordFields = document.getElementById("password-fields");
    const btnReset = document.getElementById("btn-reset");


    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
        emailError.classList.remove("d-none");
        passwordFields.classList.add("d-none");
        btnReset.classList.add("d-none");
    } else {
        const findAccount = accountList.find((account) => account.userEmail === email)
        if (findAccount) {
            emailError.classList.add("d-none");
            passwordFields.classList.remove("d-none");
            btnReset.classList.remove("d-none");
            document.querySelector("#btn-next").style.display = "none"

            document.getElementById("btn-reset").addEventListener("click", function () {
                const newPassword = document.getElementById("new-password").value;
                const confirmPassword = document.getElementById("confirm-password").value;
                const passwordError = document.getElementById("password-error");

                if (newPassword !== confirmPassword) {
                    passwordError.classList.remove("d-none");
                    return;
                }

                passwordError.classList.add("d-none");
                // set lại mật khẩu và lưu vào local
                findAccount.password = newPassword;
                localStorage.setItem("accountList", JSON.stringify(accountList));


                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Mật khẩu đã được đặt lại!",
                });

                // Reset form
                document.getElementById("reset-email-input").value = "";
                document.getElementById("new-password").value = "";
                document.getElementById("confirm-password").value = "";
                document.getElementById("password-fields").classList.add("d-none");
                document.getElementById("btn-reset").classList.add("d-none");
            });



        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email không tồn tại!",
            });
        }
    }
});



function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
