const courseList = JSON.parse(localStorage.getItem("courseList"));

const indexCourse = window.location.href.split("?course=");
console.log("khóa học cần mở - ", courseList[indexCourse[1]]);
const targetCourse = courseList[indexCourse[1]]; // Khóa học cần mở


const listLearner = targetCourse.courseStudent || [];
let learningProgram = targetCourse.learningProgram || [];
console.log(learningProgram);
const quantityLearner = document.querySelector(".quatity-learner");
quantityLearner.textContent = listLearner.length;
const bodyLearningCourse = document.querySelector(".bodyLearningCourse");
resetShow();
const emptyInform = document.querySelector("#empty-inform");
const btnSaveUpdate = document.querySelector(".btn-save");



function renderLearningProgram(array) {
    console.log(array);

    const bodyLearningCourse = document.querySelector(".bodyLearningCourse");
    bodyLearningCourse.innerHTML = ""; // reset
    array.forEach((item, i) => {
        const program = item.learningProgram || [];
        console.log(program);

        if (!program || program.length === 0) {
            emptyInform.style.display = "block";
            emptyInform.textContent = "Danh sách câu hỏi trống"
            console.log("Danh sách câu hỏi trống");
        } else {
            program.forEach((programItem, j) => {
                // emptyInform.style.display = "none";
                const block = document.createElement("div");
                block.className = "block-infor";
                block.id = `block-infor-${i}-${j}`;
                block.innerHTML = `
                <div class="block-left">
                    <img src="../assest/icon/list-skill.png" alt="" />
                </div>
                <div id="block-right-${i}-${j}" class="block-right">
                    <div class="input-infor">
                        <label for="">Tên đầu mục</label>
                        <input type="text" value="${programItem.title || ""}" />
                    </div>
                    <div class="describe">
                        <label for="">Mô tả</label>
                        <div class="input-discript">
                            <textarea>${programItem.description || ""}</textarea>
                        </div>
                    </div>
                    <div id="form-learning-${i}-${j}" class="form-learning">
                        <label for="">Hình thức học</label>
                        <select>
                            <option value="video" ${programItem.learningMethod === "video" ? "selected" : ""}>Video bài giảng</option>
                            <option value="reading" ${programItem.learningMethod === "reading" ? "selected" : ""}>Đọc bài viết / Bài tập về nhà</option>
                            <option value="quiz" ${programItem.learningMethod === "quiz" ? "selected" : ""}>Làm bài quiz</option>
                        </select>
                    </div>

                    <div id="form-learning-present-${j}" class="form-learning-present" style="display: flex; flex-direction: row; gap: 16px; align-items: flex-start;">
                        <img class="video-thumnail"
                             src="${programItem.learningVidThumnailSrc[0]}"
                             alt="thumbnail" style="width: 200px; height: auto;" />
                        <div class="present-discript">
                            <div class="title">
                                <span>Lesson ${j + 1}.</span><span> ${programItem.title}</span>
                                <div class="time-line" style="margin-top: 8px; font-weight: 500; font-size: 12px; color: #667085;">
                                    <span>6:20:48</span> - <span>570 MB</span>
                                </div>
                            </div>
                            <div class="btn-base">
                                <button onclick="addThumnail(${i}, ${j})" style="display: flex; align-items: center; gap: 10px;">
                                    <img src="../assest/icon/photo-icon.png" style="width: 16px; height: 13px" />
                                    <span>Thêm ảnh bìa</span>
                                </button>
                                <button onclick="addVid(${i}, ${j})" style="display: flex; align-items: center; gap: 10px;">
                                    <img src="../assest/icon/video-icon.png" style="width: 14px; height: 16px" />
                                    <span>Tải video</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button onclick="deleteItem(this, ${i})" class="btn-delete">
                        <img src="../assest/icon/delete-item.png" alt="" /> Xóa đầu mục
                    </button>
                </div>
            `;

                bodyLearningCourse.appendChild(block);
            });
        }

    });
}
renderLearningProgram(courseList);


function deleteItem(button, courseIndex) {
    const block = button.closest(".block-infor");

    // Lấy chỉ số đầu mục học (index trong learningProgram)
    const id = block.id; // ví dụ: block-infor-0-1
    const [, , , programIndex] = id.split("-").map(Number); // [0,1]

    // Xóa phần tử trong dữ liệu
    courseList[courseIndex].learningProgram.splice(programIndex, 1);

    // Cập nhật lại localStorage (nếu cần)
    localStorage.setItem("courseList", JSON.stringify(courseList));

    // Re-render lại
    renderLearningProgram(courseList);
}



// let learningProgram = []; // Dùng để lưu dữ liệu từng đầu mục
function addItem() {
    // emptyInform.style.display = "none";
    const container = document.querySelector(".bodyLearningCourse");
    const index = learningProgram.length;
    learningProgram[index] = {
        id: Date.now(),
        title: "",
        description: "",
        learningMethod: "",
        learningVidThumnailSrc: [],
        learningSrcVid: [],
    };

    const newBlock = document.createElement("div");
    newBlock.className = `block-infor`;

    newBlock.innerHTML = `
        <div class="block-left">
            <img src="../assest/icon/list-skill.png" alt="" />
        </div>
        <div id="block-right-${index}" class="block-right">
            <div class="input-infor">
                <label for="">Tên đầu mục</label>
                <input class="name-title" type="text" placeholder="Kiến thức chuyên ngành"
                 />
            </div>
            <div class="describe">
                <label for="">Mô tả</label>
                <div class="input-discript">
                    <textarea></textarea>
                </div>
            </div>
            <div class="form-learning">
                <label for="">Hình thức học</label>
                <select onchange="updateField(${index})">
                    <option value="">Chọn hình thức</option>
                    <option value="video">Video bài giảng</option>
                    
                </select>
            </div>
            <button class="btn-delete">
                <img src="../assest/icon/delete-item.png" alt="" /> Xóa đầu mục
            </button>
        </div>
    `;

    container.appendChild(newBlock);

}
// Lấy input vào cho từng mục 


function updateField(index) {
    // Thêm hình thức học 
    console.log("index", index);

    const container = document.querySelector(".bodyLearningCourse");
    const newBlock = container.querySelectorAll(".block-infor")[index]; // Lấy tất cả các khối thông tin của đầu mục đó

    // Lấy vào khối chứa thông tin các input

    const blockRightInput = newBlock.querySelector(`#block-right-${index}`);

    console.log(blockRightInput);
    const formLearningBlock = blockRightInput.querySelector(".form-learning");

    const inputItem = blockRightInput.querySelector("input").value;
    const discriptItem = blockRightInput.querySelector("textarea").value;
    const selectMethod = formLearningBlock.querySelector("select").value;

    console.log(selectMethod);
    console.log(inputItem);
    console.log(discriptItem);


    if (inputItem == "" || discriptItem == "" || selectMethod == "") {
        Swal.fire({
            title: "Dữ liệu không để trống",
            icon: "question"
        });
    } else {
        learningProgram[index].title = inputItem;
        learningProgram[index].description = discriptItem;
        learningProgram[index].learningMethod = selectMethod;
        if (selectMethod == "video") {
            formLearningBlock.innerHTML += `<div id="form-learning-present-${index}" class="form-learning-present">
                    <img
                        class="video-thumnail"
                        src=""
                        alt=""
                    />
                    <div class="present-discript">
                        <div class="title">
                        <span>Lesson 1.</span><span> Bài học khởi đầu</span>
                        <div
                            class="time-line"
                            style="
                            margin-top: 8px;
                            font-weight: 500;
                            font-size: 12px;
                            color: #667085;
                            "
                        >
                            <span>6:20:48</span> - <span>570 MB</span>
                        </div>
                        </div>
                        <div class="btn-base">
                        <button onclick="addThumnail(${indexCourse[1]}, ${index})" 
                            style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            width: fit-content;
                            "
                        >
                            <img
                            style="width: 16px; height: 13px"
                            src="../assest/icon/photo-icon.png"
                            alt="photo-icon"
                            />
                            <span>Thêm ảnh bìa</span>
                        </button>
                        <button onclick="addVid(${indexCourse[1]}, ${index})"
                            style="
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            width: fit-content;
                            "
                        >
                            <img
                            style="width: 14px; height: 16px"
                            src="../assest/icon/video-icon.png"
                            alt="video-icon"
                            />
                            <span>Tải video</span>
                        </button>
                        </div>
                    </div>
                    </div>`

        }
    }


}

btnSaveUpdate.onclick = () => {
    console.log(courseList);


}




function addThumnail(indexCourse, index) {
    console.log("addThumnail called for", indexCourse, index);

    const srcThumnail = prompt("Nhập link ảnh");
    if (!srcThumnail) return;

    const course = courseList[indexCourse];
    if (!course || !course.learningProgram || !course.learningProgram[index]) {
        console.error("Dữ liệu không hợp lệ:", { course, indexCourse, index });
        return;
    }

    // Đảm bảo mảng tồn tại
    if (!Array.isArray(course.learningProgram[index].learningVidThumnailSrc)) {
        course.learningProgram[index].learningVidThumnailSrc = [];
    }
    console.log(srcThumnail);

    course.learningProgram[index].learningVidThumnailSrc[0] = srcThumnail;

    // localStorage.setItem("courseList", JSON.stringify(courseList));
    renderLearningProgram(courseList);
}

function addVid(index) {
    console.log("addVidlink");

    const srcVideo = prompt(`Nhập link vid`);
    learningProgram[index].learningSrcVid.push(srcVideo)

    // Test
    console.log(learningProgram[index])
    // window.location.href = srcVideo;
    console.log(courseList[indexCourse[1]]);

    localStorage.setItem("courseList", JSON.stringify(courseList));

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
        // document.querySelector(".empty-inform").display = "block";
        // document.querySelector(".empty-question").textContent = "Danh sách câu hỏi trống";
        document.querySelector(".number-question").textContent = "0";

    } else {
        // document.querySelector(".empty-question").display = "none";
        document.querySelector(".number-question").textContent = `${listFAQ.length}`;
    }
}