const loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || "";
const courseList = JSON.parse(localStorage.getItem("courseList"));
const duplicateBtn = document.querySelector(".duplicate-course");
const logingAccount = JSON.parse(localStorage.getItem("logingAccount"));


const indexCourse = window.location.href.split("?course=");
console.log("khóa học cần mở - ", courseList[indexCourse[1]]);
const targetCourse = courseList[indexCourse[1]]; // Khóa học cần mở
const skillInCourse = targetCourse.learnedSkill;
console.log(skillInCourse);


const listSkillBlock = document.querySelectorAll(".list-skill li");
console.log(listSkillBlock);



if (loginStatus) {

    // // set tài khoản người dùng
    document.querySelector(".user-name").textContent = `${logingAccount.username}`
    document.querySelector(".user-email").textContent = `${logingAccount.userEmail}`

    // set số lượng cho các thông tin khóa học

    document.getElementById("expiredModal").style.display = "none";
    document.querySelector(".course-name").textContent = targetCourse.courseName;
    document.querySelector(".course-code").textContent = targetCourse.courseCode;
    document.querySelector(".learning-method").textContent = targetCourse.learningMethod;
    document.querySelector(".course-cost").textContent = targetCourse.courseCost.toLocaleString().split(",").join(".");
    document.querySelector(".learned-object").textContent = targetCourse.learnObject;
    document.querySelector(".major").textContent = targetCourse.major;
    document.querySelector(".course-discript").textContent = targetCourse.courseDiscript;

    if (skillInCourse.length) {
        for (let i = 0; i < skillInCourse.length; i++) {
            listSkillBlock[i].textContent = ` 👉  ${skillInCourse[i]}`;
        }

    } else {
        document.querySelector(".list-skill").textContent = "Danh sách kĩ năng trống."
        document.querySelector(".list-skill").style.color = "#b54115";
    }
    // Nhân đôi khóa học
    duplicateBtn.onclick = () => {
        const newCourse = {
            id: courseList.length + 1, // Tạo id tự động tăng dần
            courseImg: targetCourse.courseImg, // Hình ảnh khóa học
            courseCode: `PK00${Math.round(Math.random() * 100)}`, // Mã khóa học
            courseName: targetCourse.courseName, // Tên khóa học
            link: targetCourse.link, // Đường dẫn đến trang cập nhật thông tin khóa học
            hours: targetCourse.hours, // Số giờ học
            learningDuration: targetCourse.learningDuration,  // Thời gian học
            learningMethod: targetCourse.learningMethod, // Phương pháp học
            learnedSkill: targetCourse.learnedSkill, // Kỹ năng đã học
            learnObject: targetCourse.learnObject, // Đối tượng học
            major: targetCourse.major, // Chuyên ngành
            courseDiscript: targetCourse.courseDiscript, // Mô tả khóa học
            organization: targetCourse.organization,// Tổ chức đào tạo
            learnerCourse: targetCourse.learnerCourse,

        };
        Swal.fire({
            title: "Xác nhận nhân bản khóa học!",
            icon: "success",
            confirmButtonText: "Xác nhận",
            // allowOutsideClick: false, // không cho click ra ngoài để đóng
            allowEscapeKey: false,    // không cho nhấn ESC để đóng
            didOpen: () => {
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Tiến hành nhân bản khóa học sau khi xác nhận 
                console.log("Người dùng đã ấn OK");
                courseList.unshift(newCourse);
                localStorage.setItem("courseList", JSON.stringify(courseList));
            }
        });





    }



} else {
    // Giả lập hết hạn đăng nhập sau 5 giây (demo)
    setTimeout(() => {
        showExpiredModal();
    }, 3000);
}


function showExpiredModal() {
    document.getElementById("expiredModal").style.display = "block";
}
function redirectToLogin() {
    window.location.href = "../html/login.html"; // Thay đường dẫn này bằng URL trang đăng nhập của bạn
}

function logOut() {
    localStorage.setItem("loginStatus", JSON.parse(false));
    window.location.href = "../html/Home-page.html"; // Thay đường dẫn này bằng URL trang đăng nhập của bạn
}
function updateCourse() {
    localStorage.setItem("targetCourse", JSON.stringify(targetCourse));
    window.location.href = `../html/update-infor-course.html?course=${indexCourse[1]}`
}

