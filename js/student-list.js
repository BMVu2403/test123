const courseList = JSON.parse(localStorage.getItem("courseList"));

const indexCourse = window.location.href.split("?course=");
console.log("khóa học cần mở - ", courseList[indexCourse[1]]);
const targetCourse = courseList[indexCourse[1]]; // Khóa học cần mở
const listLearner = courseList[indexCourse[1]].courseStudent || [];

console.log("listLearner - ", listLearner);
const listStudentTable = document.querySelector(".tbody");


const totalPerPage = 2;
let currentPage = 1; // Mặc định trang đầu tiên là 1
let totalPages;
let start = 0; // Biến cho vị trí bắt đầu
let end = 4; // Biến cho vị trí kết thúc
const btnPrevPage = document.querySelector(".prev-btn");
const btnNextPage = document.querySelector(".next-btn");
const btnAddLearner = document.querySelector(".btn-add-learner")
const quantityLearner = document.querySelector(".quatity-learner");
const learnerQuantity = document.querySelector("#quatity-learner");
const modelAddLearner = document.querySelector(".modal-overlay");
// Hàm render danh sách học viên
function renderStudentList(array) {

    quantityLearner.textContent = array.length;
    learnerQuantity.textContent = array.length;
    console.log(array);
    // const courseList = JSON.parse(localStorage.getItem("courseList")) || []; // Lấy danh sách khóa học từ localStorage
    const listStudentTable = document.querySelector(".tbody");
    listStudentTable.innerHTML = ""; // Xóa nội dung cũ
    start = (currentPage - 1) * totalPerPage;
    end = currentPage * totalPerPage;

    if (end >= array.length) {
        end = array.length; // Nếu vị trí kết thúc theo công thức lớn hơn tổng số dự án trong mảng thì gán lại cho end bằng listProject.length luôn
    }
    for (let i = start; i < end; i++) {
        const learnerItem = document.createElement("tr");
        learnerItem.classList.add("course-item");
        learnerItem.innerHTML = `
            <td><input class="checkbox" type="checkbox" /></td>
                <td>${array[i].learnerCode}</td>
                <td style="display: flex; align-items: center; gap: 12px">
                  <img
                  class="avt-learner"
                    style="width: 35px; height: 35px; border-radious: 50%"
                    src="../assest/img/${array[i].avatarName}"
                    alt=""
                  />
                  <span>${array[i].learnerName}</span>
                </td>
                <td style="color: #667085">${array[i].learnerEmail}</td>
                <td onclick="deleteLearner(${array[i].id})" class="deleteIcon">
                  <img src="../assest/icon/Delete.png" />
                </td>
                <td onclick="editLearner(${array[i].id})" class="editIcon"><img src="../assest/icon/Edit.png" /></td>
        `;
        listStudentTable.appendChild(learnerItem);
    }
}

renderStudentList(listLearner);
renderPage(listLearner);
changePage(listLearner)
resetShow();


function renderPage(array) {
    // reset lại danh sách nút trang --> không bị lặp lại

    // total record - tổng số lượng project = listProject.length
    totalPages = Math.ceil(array.length / totalPerPage);
    document.querySelector(".total-pages").textContent = totalPages
    for (let i = 1; i <= totalPages; i++) {
        console.log("Trang số: ", i)

        // Kiểm tra xem trang nào đang được chọn --> thì active cho btn trang đó

        if (currentPage === i) {
            document.querySelector(".current-pages").textContent = i;
            document.querySelector(".total-pages").textContent = totalPages;
            document.querySelector(".current-pages").style.color = "#F24E1E";
            document.querySelector(".current-pages").style.fontWeight = "600";
        }
        //     //Kiểm tra điều kiện cho nút Next và disabled
        if (currentPage === totalPages) {
            btnNextPage.setAttribute("disabled", true);
        } else {
            btnNextPage.removeAttribute("disabled");
        }

        //     // Tương tự kiểm tra điều kiện cho nút Prev và disable
        if (currentPage === 1) {
            btnPrevPage.setAttribute("disabled", true);
        } else {
            btnPrevPage.removeAttribute("disabled");
        }


        start = (currentPage - 1) * totalPerPage;
        end = currentPage * totalPerPage;
    }
}
// Thêm sự kiện cho chuyển trang
function changePage(pages) {
    btnPrevPage.onclick = function () {
        //Thêm điều kiện kiểm tra, nếu vị trí nút hiện tại phải > 1
        if (currentPage > 1) {
            currentPage--;
            console.log("currentPage: ", currentPage);
            renderPage(pages);
            renderStudentList(pages);
        }
    };
    btnNextPage.onclick = function () {
        //Thêm điều kiện kiểm tra, nếu vị trí nút hiện tại phải > 1
        if (currentPage < totalPages) {
            currentPage++;
            console.log("currentPage: ", currentPage);
            renderPage(pages);
            renderStudentList(pages);
        }
    };
}
// Hết phần phân tran

function addLearner() {
    resetValidate();
    modelAddLearner.style.display = "block";

    const addBtn = document.querySelector("#add-btn");

    addBtn.onclick = () => {
        const newFullName = document.querySelector("#fullname").value.trim();
        const newBirthDate = document.querySelector("#dob-learner").value;
        const newEmail = document.querySelector("#email-learner").value.trim();
        const avatarInput = document.querySelector("#avatarInput");
        const avatarFile = avatarInput.files[0];

        // Validate đơn giản
        if (!newFullName || !newBirthDate || !newEmail) {
            document.querySelector(".error-dob").textContent = "Vui lòng nhập đầy đủ thông tin.";
            document.querySelector("#fullname").classList.add("error");
            document.querySelector("#dob-learner").classList.add("error");
            document.querySelector("#email-learner").classList.add("error");
            return;
        } else {
            if (ValidateInfor(newEmail, newBirthDate)) {
                const isDuplicate = listLearner.some(learner => learner.learnerEmail === newEmail);
                if (isDuplicate) {
                    document.querySelector(".error-email").textContent = "Email đã tồn tại trong danh sách học viên";
                    return false;
                } else {
                    // Thêm vào mảng
                    const learner = {
                        id: listLearner.length + 1,
                        learnerCode: `PK${10000 + listLearner.length}`,
                        learnerName: newFullName,
                        birthDate: newBirthDate,
                        learnerEmail: newEmail,
                        avatarName: avatarFile ? avatarFile.name : null,
                    };

                    if (avatarFile) {
                        const reader = new FileReader();
                        reader.onload = function () {
                            // learner.avatarData = reader.result;
                            listLearner.unshift(learner);
                            localStorage.setItem("courseList", JSON.stringify(courseList));
                            console.log("Danh sách học viên:", listLearner);
                            // resetModal();
                            renderStudentList(listLearner);
                            renderPage(listLearner);
                            changePage(listLearner);
                        };
                        reader.readAsDataURL(avatarFile);
                    } else {
                        listLearner.unshift(learner);
                        console.log("Danh sách học viên:", listLearner);
                        // resetModal();
                        exitModel();
                    }
                }
            }
        }
    }

};

function exitModel() {
    document.querySelector("#fullname").value = "";
    document.querySelector("#dob-learner").value = "";
    document.querySelector("#email-learner").value = "";

    const img = document.querySelector(".img-upload");
    img.src = "../assest/icon/Featured icon.png"; // hình ảnh icon nhập file ảnh mặc định

    const fileNameLabel = document.querySelector("#fileName");
    if (fileNameLabel) fileNameLabel.textContent = "Chưa chọn ảnh";

    document.querySelector("#avatarInput").value = "";

    modelAddLearner.style.display = "none";
}


function triggerFileInput() {
    document.getElementById('avatarInput').click();
}

function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        // Gán ảnh hiển thị
        document.querySelector('.img-upload').src = reader.result;

        // Gán tên file vào một thẻ nào đó, ví dụ thẻ span có id="fileName"
        document.getElementById('fileName').textContent = file.name;
    };
    reader.readAsDataURL(file);
}

// indexCourse[1]
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
function resetShow() {
    let listFAQ = targetCourse.courseFAQ || [];
    if (listFAQ.length <= 0) {
        // document.querySelector(".empty-question").display = "block";
        document.querySelector(".empty-question").textContent = "Danh sách câu hỏi trống";
        document.querySelector(".number-question").textContent = "0";

    } else {
        // document.querySelector(".empty-question").display = "none";
        document.querySelector(".number-question").textContent = `${listFAQ.length}`;
    }
}

function deleteLearner(id) {
    console.log("ID học viên cần xóa - ", id);
    // Tìm vị trí của học viên trong danh sách
    const indexLearner = listLearner.findIndex((learner) => learner.id === id);
    const learner = listLearner.find((learner) => learner.id === id);
    console.log("indexLearner - ", indexLearner);
    console.log("learner - ", learner);
    // thêm model xác nhận xóa
    Swal.fire({
        title: "Xóa học viên",
        text: `Bạn có chắc chắn muốn xóa học viên ${learner.learnerName} không?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận "
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Xác nhận xóa",
                text: "Xóa thành công",
                icon: "success"
            });
            listLearner.splice(indexLearner, 1);
            renderStudentList(listLearner);
            renderPage(listLearner);
            changePage(listLearner);
            // Cập nhật lại danh sách học viên trong localStorage
            localStorage.setItem("courseList", JSON.stringify(courseList));
        }
    });


}

function editLearner(id) {
    resetValidate();
    console.log("ID học viên cần sửa - ", id);
    const indexLearner = listLearner.findIndex((learner) => learner.id === id);
    const learner = listLearner[indexLearner];
    if (!learner) return;

    // Hiển thị thông tin học viên trong modal
    document.querySelector("#fullname").value = learner.learnerName;
    document.querySelector("#dob-learner").value = learner.birthDate;
    document.querySelector("#email-learner").value = learner.learnerEmail;

    // Hiển thị ảnh đại diện nếu có
    const img = document.querySelector(".img-upload");
    if (learner.avatarData) {
        img.src = learner.avatarData;
        document.getElementById('fileName').textContent = learner.avatarName || "Chưa chọn ảnh";
    } else if (learner.avatarName) {
        img.src = `../assest/img/${learner.avatarName}`;
        document.getElementById('fileName').textContent = learner.avatarName;
    } else {
        img.src = "../assest/icon/Featured icon.png";
        document.getElementById('fileName').textContent = "Chưa chọn ảnh";
    }
    document.querySelector("#avatarInput").value = "";

    // Mở modal
    modelAddLearner.style.display = "block";
    const addBtn = document.querySelector("#add-btn");
    addBtn.textContent = "Cập nhật";
    addBtn.onclick = () => {
        const newFullName = document.querySelector("#fullname").value.trim();
        const newBirthDate = document.querySelector("#dob-learner").value;
        const newEmail = document.querySelector("#email-learner").value.trim();
        const avatarInput = document.querySelector("#avatarInput");
        const avatarFile = avatarInput.files[0];

        // Validate đơn giản
        if (!newFullName || !newBirthDate || !newEmail) {
            document.querySelector(".error-dob").textContent = "Vui lòng nhập đầy đủ thông tin.";
            document.querySelector("#fullname").classList.add("error");
            document.querySelector("#dob-learner").classList.add("error");
            document.querySelector("#email-learner").classList.add("error");
            return;
        } else {
            if (ValidateInfor(newEmail, newBirthDate)) {

                learner.learnerName = newFullName;
                learner.birthDate = newBirthDate;
                learner.learnerEmail = newEmail;

                if (avatarFile) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        learner.avatarName = avatarFile.name;
                        learner.avatarData = reader.result;
                        localStorage.setItem("courseList", JSON.stringify(courseList));
                        renderStudentList(listLearner);
                        renderPage(listLearner);
                        changePage(listLearner);
                        exitModel();
                    };
                    reader.readAsDataURL(avatarFile);
                } else {
                    localStorage.setItem("courseList", JSON.stringify(courseList));
                    renderStudentList(listLearner);
                    renderPage(listLearner);
                    changePage(listLearner);
                    exitModel();
                }

            }
        }

    }
};



function ValidateInfor(email, dob) {
    // Kiểm tra email trùng
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.querySelector(".error-email").textContent = "Email không hợp lệ";
        return false;
    }
    const year = new Date(dob).getFullYear();
    if (year > 2007) {
        document.querySelector(".error-dob").textContent = "Năm sinh không hợp lệ";
        return false;
    }
    return true;
}

// reset Validate
function resetValidate() {
    document.querySelector(".error-email").textContent = "";
    document.querySelector(".error-fullname").textContent = "";
    document.querySelector(".error-dob").textContent = "";
    document.querySelector("#fullname").classList.remove("error");
    document.querySelector("#dob-learner").classList.remove("error");
    document.querySelector("#email-learner").classList.remove("error");

}

function resetShow() {
    let listFAQ = targetCourse.courseFAQ || [];
    if (listFAQ.length <= 0) {
        // document.querySelector(".empty-question").display = "block";
        document.querySelector(".number-question").textContent = "0";

    } else {
        // document.querySelector(".empty-question").display = "none";
        document.querySelector(".number-question").textContent = `${listFAQ.length}`;
    }
}