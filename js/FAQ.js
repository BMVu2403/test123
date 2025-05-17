const courseList = JSON.parse(localStorage.getItem("courseList"));

const bodyFAQList = document.querySelector(".body");
const btnSaveUpdate = document.querySelector(".btn-save-update");
const indexCourse = window.location.href.split("?course=");
console.log("khóa học cần mở - ", courseList[indexCourse[1]]);
const targetCourse = courseList[indexCourse[1]]; // Khóa học cần mở
const listLearner = courseList[indexCourse[1]].courseStudent || [];
let listFAQ = targetCourse.courseFAQ || [];

const quantityLearner = document.querySelector(".quatity-learner");

quantityLearner.textContent = listLearner.length;




function renderFAQList(array) {
    console.log(array.length);
    console.log(array);
    if (array.length <= 0) {
        document.querySelector(".empty-question").display = "block";
        document.querySelector(".empty-question").textContent = "Danh sách câu hỏi trống";

    } else {
        document.querySelector(".empty-question").display = "none";
        for (let i = 0; i < array.length; i++) {
            bodyFAQList.innerHTML += `<div class="block-info">
              <div class="block-left">
                <img src="../assest/icon/list-skill.png" alt="" />
              </div>
              <div class="block-right">
                <div class="input-info">
                  <label for="">Tên câu hỏi</label>
                  <input class="question-title" type="text" value="${array[i].question}" />
                </div>
                <div class="describe">
                  <label for="">Trả lời</label>
                  <textarea class="question-answer">${array[i].answer}</textarea>
                </div>
                <button class="btn-delete" onclick="deleteQuestion(this)">
                  <img src="../assest/icon/delete-item.png" alt="" /> Xóa câu
                  hỏi
                </button>
              </div>
            </div>`
        }
    }

}





btnSaveUpdate.onclick = function () {
    Swal.fire({
        title: "Xác nhận cập nhật thay đổi ",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Cập nhật",
        denyButtonText: `Hủy`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Đã cập nhật!", "", "success");
            getAllQuestions();
        } else if (result.isDenied) {
            Swal.fire("Hủy cập nhật", "", "info");
        }
    });


}
renderFAQList(listFAQ);
resetShow();

function addQuestion() {
    document.querySelector(".empty-question").style.display = "none";
    const container = document.querySelector(".body");

    const newBlock = document.createElement("div");
    newBlock.className = "block-info";
    newBlock.innerHTML = `
        <div class="block-left">
            <img src="../assest/icon/list-skill.png" alt="" />
        </div>
        <div class="block-right">
            <div class="input-info">
            <label for="">Tên câu hỏi</label>
            <input type="text" class="question-title" placeholder="Nhập tên câu hỏi" />
            </div>
            <div class="describe">
            <label for="">Trả lời</label>
            <textarea class="question-answer" placeholder="Nhập câu trả lời"></textarea>
            </div>
            <button class="btn-delete" onclick="deleteQuestion(this)">
            <img src="../assest/icon/delete-item.png" alt="" /> Xóa câu hỏi
            </button>
        </div>
        `;

    container.appendChild(newBlock);


}

function deleteQuestion(button) {
    const block = button.closest(".block-info");
    block.remove();
    listFAQ.length--;
    // renderFAQList(listFAQ);
    localStorage.setItem("courseList", JSON.stringify(courseList));
    resetShow();
}


function getAllQuestions() {
    const blocks = document.querySelectorAll(".block-info");
    console.log(blocks);

    listFAQ.length = 0; // Reset danh sách câu hỏi

    blocks.forEach(block => {
        const title = block.querySelector(".question-title")?.value.trim();
        const answer = block.querySelector(".question-answer")?.value.trim();

        listFAQ.push({
            id: listFAQ.length + 1,
            question: title,
            answer: answer
        });
        localStorage.setItem("courseList", JSON.stringify(courseList));
        console.log(courseList[indexCourse[1]].courseFAQ);
        // Reset hiển thị số lượng câu hởi của khóa học


    });

    console.log(listFAQ); // In dữ liệu ra console
    resetShow();
}
function resetShow() {
    if (listFAQ.length <= 0) {
        document.querySelector(".empty-question").display = "block";
        document.querySelector(".empty-question").textContent = "Danh sách câu hỏi trống";
        document.querySelector(".number-question").textContent = "0";
        document.querySelector(".question-quatity").textContent = "0";

    } else {
        document.querySelector(".empty-question").display = "none";
        document.querySelector(".number-question").textContent = `${listFAQ.length}`;
        document.querySelector(".question-quatity").textContent = `${listFAQ.length}`;;
    }
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
