// const courses = [
//     {
//         id: 1,
//         courseImg: "../assest/img/course1.png",
//         courseCode: "TK003001",
//         courseCost: 1000000,
//         courseName: "Nhập môn Lập trình C++",
//         link: "../html/details-course.html",
//         organization: "FPT Software",
//         hours: 24,
//         learningDuration: 2,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Mới bắt đầu",
//         major: "Công nghệ thông tin",
//         courseDiscript: "Khóa học cung cấp kiến thức nền tảng về ngôn ngữ lập trình C++, giúp người học làm quen với tư duy lập trình và cấu trúc cơ bản của chương trình.",
//         learnerCourse: [],
//     },
//     {
//         id: 2,
//         courseImg: "../assest/img/course1.png",
//         courseCode: "TK003002",
//         courseCost: 1000000,
//         courseName: "Thiết kế giao diện Web với HTML & CSS",
//         link: "../html/details-course.html",
//         organization: "Rikkei Academy",
//         hours: 30,
//         learningDuration: 3,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Mới bắt đầu",
//         major: "Công nghệ thông tin",
//         courseDiscript: "Học cách tạo giao diện web thân thiện và chuẩn responsive bằng HTML và CSS, dành cho người mới bắt đầu.",
//         learnerCourse: [],
//     },
//     {
//         id: 3,
//         courseImg: "../assest/img/course1.png",
//         courseCode: "TK003003",
//         courseCost: 1000000,
//         courseName: "JavaScript cơ bản cho Web Developer",
//         link: "../html/details-course.html",
//         organization: "CodeGym",
//         hours: 28,
//         learningDuration: 2.5,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Đã bắt đầu",
//         major: "Thiết kế",
//         courseDiscript: "Làm quen với cú pháp JavaScript và cách sử dụng ngôn ngữ này để tương tác với trang web.",
//         learnerCourse: [],
//     },
//     {
//         id: 4,
//         courseImg: "../assest/img/course1.png",
//         courseCode: "TK003004",
//         courseCost: 1000000,
//         courseName: "Lập trình Python cơ bản",
//         link: "../html/details-course.html",
//         organization: "FUNiX",
//         hours: 35,
//         learningDuration: 4,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Mới bắt đầu",
//         major: "Công nghệ thông tin",
//         courseDiscript: "Khóa học hướng dẫn lập trình cơ bản với Python, phù hợp với người mới bắt đầu trong lĩnh vực lập trình và phân tích dữ liệu.",
//         learnerCourse: [],
//     },
// ]
// {
//     id: 5,
//     courseImg: "../assest/img/course1.png",
//     courseCode: "TK003005",
//         courseCost: 1000000,
//         courseName: "MySQL cho nhà thiết kế web",
//         link: "../html/details-course.html",
//         organization: "TechMaster",
//         hours: 32,
//         learningDuration: 3,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Đã bắt đầu",
//         major: "Thiết kế",
//         courseDiscript: "Học cách sử dụng cơ sở dữ liệu MySQL để hỗ trợ các dự án thiết kế web tương t,ác."
//  learnerCourse: [],    
// },
//     {
//         id: 6,
//         courseImg: "../assest/img/course1.png",
//         courseCode: "TK003006",
//         courseCost: 1000000,
//         courseName: "Lập trình Java cơ bản cho người mới",
//         link: "../html/details-course.html",
//         organization: "FPT",
//         hours: 40,
//         learningDuration: 5,
//         learningMethod: "E-learning",
//         learnedSkill: [],
//         learnObject: "Đã bắt đầu",
//         major: "Marketing",
//         courseDiscript: "Giới thiệu ngôn ngữ lập trình Java cơ bản và các ứng dụng thực tiễn trong Marketing số."
//     },
// ]
// localStorage.setItem("courseList", JSON.stringify(courses));
const courseList = JSON.parse(localStorage.getItem("courseList")) || []; // Lấy danh sách khóa học từ localStorage
const logingAccount = JSON.parse(localStorage.getItem("logingAccount"));
// const courseList = JSON.parse(localStorage.getItem("courseList")) || [];

const loginStatus = JSON.parse(localStorage.getItem("loginStatus")); // Lấy trạng thái đăng nhập từ localStorage

const courseListContainer = document.querySelector(".tbody");
const listSkillBlock = document.querySelector(".list-skill-input");
const modelAddCourse = document.querySelector(".model-add-course");
const submitBtn = document.querySelector(".submit-btn");
const importListCourse = document.querySelector(".import-list");
const btnPrevPage = document.querySelector(".prev-btn");
const btnNextPage = document.querySelector(".next-btn");
let mktCourseQuatity = courseList.filter((course) => course.major === "Marketing");
let itCourseQuatity = courseList.filter((course) => course.major === "Công nghệ thông tin");
let designCourseQuatity = courseList.filter((course) => course.major === "Thiết kế");
document.querySelector("#total-course span").textContent = courseList.length;
document.querySelector("#IT-course span").textContent = itCourseQuatity.length;
document.querySelector("#mkt-course span").textContent = mktCourseQuatity.length;
document.querySelector("#design-course span").textContent = designCourseQuatity.length;

let modelAddStatus = "add";

// Hàm renderPage
const totalPerPage = 5;
let currentPage = 1; // Mặc định trang đầu tiên là 1
let totalPages;
let start = 0; // Biến cho vị trí bắt đầu
let end = 4; // Biến cho vị trí kết thúc
// Mặc định giá trị bắt đầu vfa kết thúc cho danh sách trang đầu tiên

// Khởi tạo 2 khóa học mẫu nếu localStorage chưa có dữ liệu
if (!localStorage.getItem('courseList')) {
    const defaultCourses = [
        {
            id: 1,
            courseName: "Nhập môn lập trình C++",
            courseCode: "KH052424",
            organization: "FPT Software",
            courseImg: "../assest/img/course1.png",
            courseCost: 1000000,
            hours: 24,
            learningDuration: 2,
            learningMethod: "E-learning",
            learnedSkill: [],
            learnObject: "Mới bắt đầu",
            major: "Công nghệ thông tin",
            courseDiscript: "Khóa học cung cấp kiến thức nền tảng về ngôn ngữ lập trình C++, giúp người học làm quen với tư duy lập trình và cấu trúc cơ bản của chương trình.",
            learnerCourse: []
        },
        {
            id: 2,
            courseName: "Nhập môn lập trình Python",
            courseCode: "KH052425",
            organization: "Rikkei Academy",
            courseImg: "../assest/img/course1.png",
            courseCost: 1000000,
            hours: 30,
            learningDuration: 3,
            learningMethod: "E-learning",
            learnedSkill: [],
            learnObject: "Mới bắt đầu",
            major: "Công nghệ thông tin",
            courseDiscript: "Khóa học hướng dẫn lập trình cơ bản với Python, phù hợp với người mới bắt đầu trong lĩnh vực lập trình và phân tích dữ liệu.",
            learnerCourse: []
        }
    ];
    localStorage.setItem('courseList', JSON.stringify(defaultCourses));
}

// Kiểm tra trạng thái đăng nhập
if (loginStatus) {
    console.log("Đã đăng nhập");
    document.getElementById("expiredModal").style.display = "none";

    // // set tài khoản người dùng
    document.querySelector(".user-name").textContent = `${logingAccount.username}`
    document.querySelector(".user-email").textContent = `${logingAccount.userEmail}`



    filterCourseType();
    // Logout
    const logoutBtn = document.querySelector(".logOut");
    logoutBtn.onclick = function () {
        localStorage.setItem("loginStatus", JSON.stringify(false)); // Đặt trạng thái đăng nhập là false
        window.location.href = "../html/Home-page.html"; // Chuyển hướng về trang đăng nhập
    };
} else {
    // Giả lập hết hạn đăng nhập sau 5 giây (demo)
    setTimeout(() => {
        showExpiredModal();
    }, 100);
}


function showExpiredModal() {
    document.getElementById("expiredModal").style.display = "block";
}
function redirectToLogin() {
    window.location.href = "../html/login.html"; // Thay đường dẫn này bằng URL trang đăng nhập của bạn
}



// lọc và render khóa học theo từng chuyên ngành
function filterCourseType() {
    const totalCourse = document.querySelector("#total-course");
    const itCourse = document.querySelector("#IT-course");
    const mktCourse = document.querySelector("#mkt-course");
    const designCourse = document.querySelector("#design-course");
    let filterListCourse = [];
    console.log(filterListCourse);
    renderCourseList(courseList);
    renderPage(courseList);
    changePage(courseList);
    totalCourse.onclick = () => {

        totalCourse.classList.replace("block-inactive", "block-active");
        itCourse.classList.replace("block-active", "block-inactive");
        mktCourse.classList.replace("block-active", "block-inactive");
        designCourse.classList.replace("block-active", "block-inactive");
        document.querySelector(".block-active span").textContent = courseList.length;
        currentPage = 1;
        renderCourseList(courseList);
        renderPage(courseList);
        changePage(courseList);
    }
    mktCourse.onclick = () => {
        filterListCourse = courseList.filter((course) => course.major === "Marketing");
        console.log(filterListCourse);
        mktCourse.classList.replace("block-inactive", "block-active");
        itCourse.classList.replace("block-active", "block-inactive");
        totalCourse.classList.replace("block-active", "block-inactive");
        designCourse.classList.replace("block-active", "block-inactive");
        document.querySelector(".block-active span").textContent = filterListCourse.length;
        currentPage = 1;
        renderCourseList(filterListCourse);
        renderPage(filterListCourse);
        changePage(filterListCourse);
    }
    itCourse.onclick = () => {
        filterListCourse = courseList.filter((course) => course.major === "Công nghệ thông tin");
        console.log(filterListCourse);
        itCourse.classList.replace("block-inactive", "block-active");
        mktCourse.classList.replace("block-active", "block-inactive");
        totalCourse.classList.replace("block-active", "block-inactive");
        designCourse.classList.replace("block-active", "block-inactive");
        document.querySelector(".block-active span").textContent = filterListCourse.length;
        currentPage = 1;
        renderCourseList(filterListCourse);
        renderPage(filterListCourse);
        changePage(filterListCourse);
    }
    designCourse.onclick = () => {
        filterListCourse = courseList.filter((course) => course.major === "Thiết kế");
        console.log(filterListCourse);
        designCourse.classList.replace("block-inactive", "block-active");
        itCourse.classList.replace("block-active", "block-inactive");
        totalCourse.classList.replace("block-active", "block-inactive");
        mktCourse.classList.replace("block-active", "block-inactive");
        document.querySelector(".block-active span").textContent = filterListCourse.length;
        currentPage = 1;
        renderCourseList(filterListCourse);
        renderPage(filterListCourse);
        changePage(filterListCourse);
    }
}

// Hàm render danh sách dự án
function renderCourseList(array) {
    console.log(array);
    // const courseList = JSON.parse(localStorage.getItem("courseList")) || []; // Lấy danh sách khóa học từ localStorage
    const courseListContainer = document.querySelector(".tbody");
    courseListContainer.innerHTML = ""; // Xóa nội dung cũ
    start = (currentPage - 1) * totalPerPage;
    end = currentPage * totalPerPage;

    if (end >= array.length) {
        end = array.length; // Nếu vị trí kết thúc theo công thức lớn hơn tổng số dự án trong mảng thì gán lại cho end bằng listProject.length luôn
    }
    for (let i = start; i < end; i++) {
        const courseItem = document.createElement("tr");
        courseItem.classList.add("course-item");
        courseItem.innerHTML = `
            <td><input class="checkbox" type="checkbox" /></td>
                <td>${array[i].courseCode}</td>
                <td style="cursor: pointer" onclick="showCourse(${array[i].id})">
                  ${array[i].courseName}
                </td>
                <td>${array[i].organization}</td>
                <td style="color:#667085;">${array[i].hours}</td>
                <td style="color:#667085;">${array[i].learningDuration}</td>
                <td onclick="deleteCourse(${array[i].id})" class="deleteIcon">
                  <img src="../assest/icon/Delete.png" />
                </td>
                <td onclick="editCourse(${array[i].id})" class="editIcon"><img src="../assest/icon/Edit.png" /></td>
        `;
        courseListContainer.appendChild(courseItem);
    }


}
// Hàm render danh sách phân trang
function renderPage(listCourse) {
    // reset lại danh sách nút trang --> không bị lặp lại
    // total record - tổng số lượng project = listProject.length
    totalPages = Math.ceil(listCourse.length / totalPerPage);
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
            renderCourseList(pages);
        }
    };
    btnNextPage.onclick = function () {
        //Thêm điều kiện kiểm tra, nếu vị trí nút hiện tại phải > 1
        if (currentPage < totalPages) {
            currentPage++;
            console.log("currentPage: ", currentPage);
            renderPage(pages);
            renderCourseList(pages);
        }
    };
}
// Hết phần phân trang

// Tìm kiếm khóa học
function searchCourse() {
    const searchInput = document.querySelector(".input-search-block").value;
    console.log("searchInput - ", searchInput);
    const findedCourse = courseList.filter((course) => course.courseName.toLowerCase().includes(searchInput.toLowerCase()));
    console.log("findedCourse - ", findedCourse);

    if (findedCourse.length === 0 || searchInput === "") {
        document.querySelector(".seach-result-block div").style.display = "none"; // Hiện thị kết quả tìm kiếm
        // document.querySelector(".result-search").textContent = findedCourse.length;
    } else {
        document.querySelector(".seach-result-block div").style.display = "block"; // Hiện thị kết quả tìm kiếm
        document.querySelector(".result-search").textContent = findedCourse.length;
    }
    // render lại theo danh sách đã tìm thấy

    renderCourseList(findedCourse); // Gọi hàm renderCourseList để hiển thị danh sách khóa học đã tìm thấy
    renderPage(findedCourse); // Gọi hàm renderPage để hiển thị phân trang sau khi tìm kiếm
    changePage(findedCourse); // Gọi hàm changePage để thay đổi trang sau khi tìm kiếm

    // render trang cho danh sách tìm kiếm
    // document.querySelector(".pagination").style.display = "none"; // Ẩn phân trang    

}

// Thêm khóa học
function addCourseToList() {

    console.log("Trạng thái thêm khóa học");
    filterCourseType();
    modelAddCourse.style.display = "block";
    // Nếu có bất kì trường nào được nhập thì chuyển submit-btn thành submit-btn-active
    document.querySelector(".input-course-name").addEventListener("keyup", () => {
        submitBtn.classList.replace("submit-btn", "submit-btn-active");
        if (document.querySelector(".input-course-name").value === "") {
            submitBtn.classList.replace("submit-btn-active", "submit-btn");
        }
    })
    if (modelAddStatus === "add") {
        submitBtn.onclick = function () {
            const listSkillInput = document.querySelectorAll(".list-skill-input input");
            console.log(listSkillInput);
            const listSkillValue = [];
            const courseName = document.querySelector(".input-course-name").value;
            const studyObject = document.querySelector(".study-object").value;
            const hoursLesson = document.querySelector(".hours-learning").value;
            const majorTraining = document.querySelector(".major").value;
            const organizeTraining = document.querySelector(".organization").value;
            const courseDiscript = document.querySelector(".discription").value;

            for (let i = 0; i < listSkillInput.length; i++) {
                console.log(listSkillInput[i].value);
                listSkillValue.unshift(listSkillInput[i].value)
                // document.querySelector(".skill-input").value;
            }
            const courseCost = document.querySelector(".course-cost").value;
            if (!courseName || !studyObject || !hoursLesson || !majorTraining || !organizeTraining || !courseDiscript || !courseCost) {
                document.querySelector(".error-model").style.display = "block";
                document.querySelector(".error-model").textContent = `Vui lòng nhập thông tin hợp lệ`;
                const inputsAndSelects = document.querySelectorAll('.modal-body input, .modal-body select');
                console.log(inputsAndSelects);

                inputsAndSelects.forEach(element => {
                    if (!element.value.trim()) {
                        element.classList.add('error-input'); // bạn có thể tạo class error để hiển thị viền đỏ chẳng hạn
                    }
                });

            } else {
                const inputsAndSelects = document.querySelectorAll('.modal-body input, .modal-body select');
                console.log(inputsAndSelects);
                // Sẽ nhận những ô input còn trống thì sẽ add class error
                inputsAndSelects.forEach(element => {
                    if (!element.value.trim()) {
                        element.classList.remove('error-input'); // bạn có thể tạo class error để hiển thị viền đỏ chẳng hạn
                    }
                });
                // console.log("courseName -  ", courseName);
                // console.log("studyObject -  ", studyObject);
                // console.log("hoursLesson -  ", hoursLesson);
                // console.log("majorTraining -  ", majorTraining);
                // console.log("organizeTraining -  ", organizeTraining);
                // console.log("courseDiscript -  ", courseDiscript);
                // console.log("courseSkill -  ", skillInCourse);
                // console.log("courseCost -  ", courseCost);

                // in ra dnah sachs truowsc khi them
                console.log("courseList truoc khi them - ", courseList);
                const newCourse = {
                    id: courseList.length + 1, // Tạo id tự động tăng dần
                    courseImg: "../assest/img/course1.png", // Hình ảnh khóa học
                    courseCode: `TK00${Math.round(Math.random() * 100)}`, // Mã khóa học
                    courseName: courseName, // Tên khóa học
                    link: "../html/update-infor-course.html", // Đường dẫn đến trang cập nhật thông tin khóa học
                    hours: Math.round(Math.random() * 20), // Số giờ học
                    learningDuration: hoursLesson,  // Thời gian học
                    learningMethod: "E-learning", // Phương pháp học
                    learnedSkill: listSkillValue, // Kỹ năng đã học
                    learnObject: studyObject, // Đối tượng học
                    major: majorTraining, // Chuyên ngành
                    courseDiscript: courseDiscript, // Mô tả khóa học
                    organization: organizeTraining,// Tổ chức đào tạo
                    courseCost: courseCost,
                    courseStudent: [], // Danh sách học viên của khóa học
                    courseFAQ: [], // Danh sách câu hỏi thường gặp của khóa học
                    learningProgram: [],
                }
                console.log("newCourse", newCourse);

                courseList.unshift(newCourse); // Thêm khóa học mới vào danh sách khóa học
                // In danh sách khóa học sau khi thêm
                console.log("courseList sau khi them - ", courseList);
                localStorage.setItem("courseList", JSON.stringify(courseList));
                renderCourseList(courseList); // Gọi hàm renderCourseList để hiển thị danh sách khóa học sau khi thêm
                // đóng model
                filterCourseType();
                reFreshModel();
                modelAddCourse.style.display = "none";
                submitBtn.classList.replace("submit-btn", "submit-btn-active");

            }
        };
    }
}

// Sửa thông tin khóa học
function editCourse(id) {
    modelAddStatus = "edit"; // Đặt trạng thái là sửa

    if (modelAddStatus === "edit") {

        submitBtn.classList.replace("submit-btn", "edit-btn"); // Đổi nút submit thành nút sửa
        submitBtn.classList.replace("submit-btn-active", "edit-btn"); // Đổi nút submit thành nút sửa
        console.log(submitBtn);
        const editBtn = document.querySelector(".edit-btn");
        editBtn.textContent = "Sửa khóa học"; // Đổi chữ trên nút sửa

        const courseEdit = courseList.find((course) => course.id === id);
        const editCourseIndex = courseList.findIndex((course) => course.id === id);
        console.log(courseEdit);
        console.log(editCourseIndex);

        // Lấy ra mảng danh sách các kĩ năng được học trong khóa học
        const listSkillInput = courseEdit.learnedSkill;
        console.log(listSkillInput);
        document.querySelector(".model-add-course").style.display = "block"; // Hiển thị model sửa khóa học
        document.querySelector(".input-course-name").value = courseEdit.courseName;
        document.querySelector(".study-object").value = courseEdit.learnObject;
        document.querySelector(".hours-learning").value = courseEdit.learningDuration;
        document.querySelector(".major").value = courseEdit.major;
        document.querySelector(".organization").value = courseEdit.organization;
        document.querySelector(".discription").value = courseEdit.courseDiscript;
        // render list kĩ năng được học

        if (listSkillInput.length <= 0) {
            listSkillBlock.innerHTML = ` <input
                        class="skill-input"
                        type="text"
                        placeholder="HTML căn bản"
                      />`
            document.querySelector(".skill-input").value = "";
        } else {
            console.log(listSkillInput);
            for (let i = 0; i < listSkillInput.length; i++) {
                listSkillBlock.innerHTML += `<input
                        class="skill-input"
                        type="text"
                      />`
            }
            for (let i = 0; i < listSkillInput.length; i++) {
                const skillInputBlock = document.querySelectorAll(".list-skill-input input");
                skillInputBlock[i].value = listSkillInput[i];

            }
        }
        document.querySelector(".course-cost").value = courseEdit.courseCost;
        // 
        document.querySelector(".edit-btn").onclick = function () {
            courseEdit.courseName = document.querySelector(".input-course-name").value;
            courseEdit.learnObject = document.querySelector(".study-object").value;
            courseEdit.learningDuration = document.querySelector(".hours-learning").value;
            courseEdit.major = document.querySelector(".major").value;
            courseEdit.organization = document.querySelector(".organization").value;
            courseEdit.courseDiscript = document.querySelector(".discription").value;
            // 
            const skillInputBlock = document.querySelectorAll(".list-skill-input input");
            courseEdit.learnedSkill = [];
            for (let i = 0; i < skillInputBlock.length; i++) {
                if (skillInputBlock[i].value) {
                    courseEdit.learnedSkill.unshift(skillInputBlock[i].value);
                }
            }
            courseEdit.courseCost = document.querySelector(".course-cost").value;

            console.log("courseEdit sau khi sua - ", courseEdit);
            renderCourseList(courseList);
            renderPage(courseList); // Gọi hàm renderPage để hiển thị phân trang sau khi sửa
            localStorage.setItem("courseList", JSON.stringify(courseList));
            // đóng model sửa
            editBtn.textContent = "Thêm khóa học"; // Đổi chữ trên nút sửa
            editBtn.classList.replace("edit-btn", "submit-btn"); // Đổi lại nút sửa thành nút submit
            modelAddStatus = "add"; // Đặt lại trạng thái là thêm khóa học
            document.querySelector(".model-add-course").style.display = "none"; // Hiển thị model sửa khóa học
            reFreshModel(); // Làm mới model
            filterCourseType();
        }

    }

}

// Xóa khóa học
function deleteCourse(id) {
    // const courseList = JSON.parse(localStorage.getItem("courseList")) || []; // Lấy danh sách khóa học từ localStorage
    console.log("courseList trước khi xoa - ", courseList);
    const confirmDelete = document.querySelector(".confirm-delete-btn");
    const cancelDelete = document.querySelector(".cancel-delete-btn");

    const deleteCourse = courseList.find((course) => course.id === id);
    const deleteCourseIndex = courseList.findIndex((course) => course.id === id);
    console.log(deleteCourse);
    console.log(deleteCourseIndex);
    document.querySelector(".courseDelName").textContent = deleteCourse.courseName; // Hiển thị tên khóa học cần xóa
    document.querySelector(".model-delete-course").style.display = "block";
    // xác nhận xóa hoặc hủy


    confirmDelete.onclick = function () {
        courseList.splice(deleteCourseIndex, 1); // Xóa khóa học khỏi danh sách
        console.log("courseList sau khi xoa - ", courseList);
        // localStorage.setItem("courseList", JSON.stringify(courseList)); // Cập nhật danh sách khóa học vào localStorage
        renderCourseList(courseList); // Gọi hàm renderCourseList để hiển thị danh sách khóa học sau khi xóa
        renderPage(courseList); // Gọi hàm renderPage để hiển thị phân trang sau khi xóa
        localStorage.setItem("courseList", JSON.stringify(courseList));
        document.querySelector(".model-delete-course").style.display = "none";
    }
    // Hủy xóa khóa học
    cancelDelete.addEventListener("click", function () {
        document.querySelector(".model-delete-course").style.display = "none";
    });
    filterCourseType();


}
function exitModel() {
    modelAddCourse.style.display = "none";
    document.querySelector(".error-model").style.display = "none";

    reFreshModel();
}
// Hàm clone để mở hộp thoại tải file
function triggerFileInput() {
    document.querySelector(".import-clone").click();
}
// Xử lý file sau khi chọn
function importCourse() {
    // ?. giúp kiểm tra xem phần tử có tồn tại hay không trước khi truy cập thuộc tính files
    const file = document.querySelector(".import-clone")?.files[0];
    if (!file) return alert("Vui lòng chọn file hợp lệ.");

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    // Kiểm tra định dạng file
    if (fileName.endsWith(".csv") || fileName.endsWith(".txt")) {
        reader.onload = e => {
            const lines = e.target.result.trim().split("\n");
            const courseList = lines.map(line => line.split(",").map(item => item.trim()));
            console.log("CSV/TXT:", courseList);
        };
        reader.readAsText(file);
        console.log(file);
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        reader.onload = e => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const courseList = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            console.log("Excel:", courseList);
        };
        reader.readAsArrayBuffer(file);
        console.log(file);

    } else {
        alert("Định dạng file không được hỗ trợ.");
    }


}
// Hàm reFresh model khi đóng lại hoặc cần làm mới
function reFreshModel() {
    document.querySelector(".input-course-name").value = "";
    document.querySelector(".study-object").value = "0";
    document.querySelector(".hours-learning").value = "";
    document.querySelector(".major").value = "0";
    document.querySelector(".organization").value = "0";
    document.querySelector(".discription").value = "";
    document.querySelector(".skill-input").value = "";
    document.querySelector(".course-cost").value = "";
    const inputsAndSelects = document.querySelectorAll('.modal-body input, .modal-body select');
    console.log(inputsAndSelects);
    inputsAndSelects.forEach(element => {
        if (!element.value.trim()) {
            element.classList.remove('error-input');
        }
    });
    listSkillBlock.innerHTML = `<input
                        class="skill-input"
                        type="text"
                        placeholder="HTML căn bản"
                      />`
}

console.log(listSkillBlock);
function addSkill() {
    const input = document.createElement("input");
    input.className = "skill-input";
    input.type = "text";
    input.placeholder = "Nhập kỹ năng";

    listSkillBlock.appendChild(input);
    console.log(document.querySelectorAll(".list-skill-input input"));

}

function showCourse(id) {
    console.log(id);
    const courseToShow = courseList.find((item) => item.id === id);
    console.log("courseToShow", courseToShow);
    const courseShowIndex = courseList.findIndex((item) => item.id === id)
    console.log(courseShowIndex);
    window.location.href = `details-course.html?course=${courseShowIndex}`
    localStorage.setItem("targetCourse", JSON.stringify(courseToShow));
}