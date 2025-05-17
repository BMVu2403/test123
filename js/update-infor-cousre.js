
const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
console.log("loginStatus", loginStatus);
const courseList = JSON.parse(localStorage.getItem("courseList"));

const indexCourse = window.location.href.split("?course=");
console.log("khóa học cần mở - ", courseList[indexCourse[1]]);
const targetCourse = courseList[indexCourse[1]]; // Khóa học cần mở
const listLearner = targetCourse.courseStudent || [];

const quantityLearner = document.querySelector(".quatity-learner");
quantityLearner.textContent = listLearner.length;
let listFAQ = targetCourse.courseFAQ || [];


let skillValues = targetCourse.learnedSkill;
// const setUpdateBtn = document.querySelector(".setUpdate");

if (loginStatus === true) {
    document.getElementById("expiredModal").style.display = "none";
    renderInforCourse();
    renderListSkill();
    resetShow();
    document.querySelector(".cancel-update-btn").onclick = () => {
        window.history.back();
    };
} else {
    // Giả lập hết hạn đăng nhập sau 5 giây (demo)
    setTimeout(() => {
        showExpiredModal();
    }, 3000);
}

function renderInforCourse() {
    const targetCourse = JSON.parse(localStorage.getItem("targetCourse"));
    document.querySelector(".courseName").value = targetCourse.courseName
    document.querySelector(".learned-object").value = targetCourse.learnObject
    document.querySelector(".courseMajor").value = targetCourse.major
    document.querySelector(".training-organize").value = targetCourse.organization
    document.querySelector(".discription-course").value = targetCourse.courseDiscript
    document.querySelector(".courseCost").value = targetCourse.courseCost.toLocaleString().split(",").join(".");
}

function showExpiredModal() {
    document.getElementById("expiredModal").style.display = "block";
}
function redirectToLogin() {
    window.location.href = "../html/Home-page.html";
}
function renderListSkill() {

    console.log(targetCourse.learnedSkill);
    const skillBlock = document.querySelectorAll(".skill-block input");
    console.log(skillBlock);
    if (targetCourse.learnedSkill.length <= 0) {
        // document.querySelector("#error-skill").textContent = "Danh sách kĩ năng trống";
        document.querySelector(".btn-add-skill").style.display = "block";

        console.log("KHÔNG CÓ DỮ LIỆU");
        document.querySelector(".skill-block").innerHTML = "";
    } else {
        // document.querySelector("#error-skill").textContent = "";

        document.querySelector(".skill-block").innerHTML = "";
        console.log(document.querySelector("#error-skill"));
        document.querySelector(".btn-add-skill").style.display = "block";
        for (let i = 0; i < skillValues.length; i++) {
            document.querySelector(".skill-block").innerHTML += `<div id="skill${i}" class="skill-item">
            <img
            style="width: 8px; height: 16px"
            src="../assest/icon/list-skill.png"
            alt=""
            />
            <input value="${skillValues[i]}" type="text"  id="inputSkill" />
            <img
            onclick=deleteSkill(${i})
            style="width: 17px; height: 17px"
            src="../assest/icon/delete-skill.png"
            alt=""
            />
            </div>`
        }

    }
}
function deleteSkill(index) {
    console.log(document.querySelector(`#skill${index}`));

    console.log(index);

    console.log("cần xóa: ", skillValues[index]);

    console.log(skillValues[index]);
    skillValues.splice(index, 1);
    renderListSkill();


}

const newSkillList = []; // Mảng danh sách kĩ năng sau khi cập nhật
let index = skillValues.length || 0;

function addSkill() {
    console.log("skillValues.length", skillValues.length);

    document.querySelector(".skill-block")
        .insertAdjacentHTML("beforeend", `
    <div id="skill${index}" class="skill-item">
      <img style="width: 8px; height: 16px" src="../assest/icon/list-skill.png" alt="" />
      <input type="text" placeholder="Enter để lưu" class="inputSkill" />
      <img onclick="deleteSkill(${index})" style="width: 17px; height: 17px" src="../assest/icon/delete-skill.png" alt="" />
    </div>
  `);

    const inputs = document.querySelectorAll(".skill-block input");
    const newInput = inputs[inputs.length - 1]; // lấy input mới nhất vừa thêm
    newInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            targetCourse.learnedSkill = [];
            inputs.forEach((input, i) => {
                targetCourse.learnedSkill.push(input.value);
                console.log(`${i}, ${input.value}`);
            });
            console.log(targetCourse.learnedSkill);
            localStorage.setItem("targetCourse", JSON.stringify(targetCourse));
            const targetCourseIndex = courseList.find((course) => course.id === targetCourse.id);
            courseList.splice(targetCourseIndex, 1, targetCourse);
            localStorage.setItem("courseList", JSON.stringify(courseList));
            console.log(targetCourse);
        }
    });

    index++;


}

function setUpdate() {
    // Tạo bản sao của targetCourse ->> để tránh thay đổi reference
    const updatedCourse = JSON.parse(JSON.stringify(targetCourse));

    // Lấy dữ liệu mới từ input
    const newCourseName = document.querySelector(".courseName").value;
    const newLearnerCourse = document.querySelector(".learned-object").value;
    const newCourseMajor = document.querySelector(".courseMajor").value;
    const newTrainingCourse = document.querySelector(".training-organize").value;
    const newDiscription = document.querySelector(".discription-course").value;
    const newCourseCost = document.querySelector(".courseCost").value.split(".").join("");

    // Cập nhật dữ liệu cho bản sao
    updatedCourse.courseName = newCourseName;
    updatedCourse.learnObject = newLearnerCourse;
    updatedCourse.major = newCourseMajor;
    updatedCourse.organization = newTrainingCourse;
    updatedCourse.courseDiscript = newDiscription;
    updatedCourse.courseCost = Number(newCourseCost).toLocaleString("vi-VN");

    // Cập nhật localStorage

    Swal.fire({
        title: "Xác nhận cập nhật khóa học!",
        icon: "success",
        confirmButtonText: "Xác nhận",
        allowEscapeKey: false,    // không cho nhấn ESC để đóng
    }).then((result) => {
        if (result.isConfirmed) {
            // Thực hiện xác nhận ở đây
            console.log("Người dùng đã ấn OK");
            localStorage.setItem("targetCourse", JSON.stringify(updatedCourse));
            // Cập nhật courseList
            const targetCourseIndex = courseList.findIndex((course) => course.id === updatedCourse.id);
            if (targetCourseIndex !== -1) {
                courseList.splice(targetCourseIndex, 1, updatedCourse);
                localStorage.setItem("courseList", JSON.stringify(courseList));
            }

            // Hiển thị lại thông tin đã cập nhật
            renderInforCourse();
            window.location.href = "e-course-page.html";
        }
    });
}

function resetShow() {
    console.log(listFAQ);

    if (listFAQ.length <= 0) {
        document.querySelector(".number-question").textContent = "0";
    } else {
        document.querySelector(".number-question").textContent = `${listFAQ.length}`;
    }
}


function toUpdateInfor(indexCourse) {
    window.location.href = `update-infor-course.html?course=${indexCourse[1]}`
}
function tolearningProgram(indexCourse) {
    window.location.href = `learning-program.html?course=${indexCourse[1]}`
}
function toFAQ(indexCourse) {
    window.location.href = `FAQ.html?course=${indexCourse[1]}`
}
function tostudent(indexCourse) {
    window.location.href = `student-list.html?course=${indexCourse[1]}`
}
