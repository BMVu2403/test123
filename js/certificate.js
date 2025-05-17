const saveCertificateButton = document.getElementById('saveCertificateButton');
const tableBody = document.getElementById('certificateTableBody');
const certificateForm = document.getElementById('certificateForm');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const toastDelete = new bootstrap.Toast(document.getElementById('toastDelete'));
const toastSuccess = new bootstrap.Toast(document.getElementById('toastSuccess'));
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const loginStatus = JSON.parse(localStorage.getItem("loginStatus")) || ""; // Lấy trạng thái đăng nhập từ localStorage


let certificateToDeleteId = null;
let currentPage = 1;
const itemsPerPage = 5;

let listCertificates = [
    { id: 'TK000001', name: 'Chứng chỉ Khóa học lập trình nâng cao', examDate: '2025-05-01', description: 'Đã cấp' },
    { id: 'TK000002', name: 'Chứng chỉ Lập trình cơ bản', examDate: '2025-05-02', description: 'Đã cấp' },
    { id: 'TK000003', name: 'Chứng chỉ Khóa học lập trình nâng cao', examDate: '2025-05-03', description: 'Đã cấp' },
    { id: 'TK000004', name: 'Chứng chỉ Khóa học lập trình nâng cao', examDate: '2025-05-04', description: 'Đã cấp' },
    { id: 'TK000005', name: 'Chứng chỉ Khóa học lập trình nâng cao', examDate: '2025-05-05', description: 'Đã cấp' },
];

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationInfo = document.getElementById('paginationInfo');
    if (paginationInfo) {
        paginationInfo.textContent = `Trang ${currentPage} trong ${totalPages}`;
    }
    if (prevPageButton) {
        prevPageButton.disabled = currentPage === 1;
    }
    if (nextPageButton) {
        nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
    }
}

function renderTable(certificates) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const certificatesToDisplay = certificates.slice(startIndex, endIndex);

    certificatesToDisplay.forEach((certificate) => {
        tableBody.appendChild(
            addCertificateRow(certificate.id, certificate.name, certificate.examDate, certificate.description)
        );
    });

    updatePagination(certificates.length);
}

function saveToLocalStorage() {
    const rows = Array.from(document.querySelectorAll('#certificateTableBody tr'));
    const certificates = rows.map((row) => ({
        id: row.cells[1].textContent.trim(),
        name: row.cells[2].textContent.trim(),
        examDate: row.cells[2].getAttribute('data-exam-date'),
        description: row.cells[2].getAttribute('data-description'),
    }));

    localStorage.setItem('certificates', JSON.stringify(certificates));
    renderTable(certificates);
}

function loadFromLocalStorage() {
    const certificates = JSON.parse(localStorage.getItem('certificates')) || listCertificates;
    renderTable(certificates);
}

function getNextId() {
    const certificates = JSON.parse(localStorage.getItem('certificates')) || listCertificates;
    let maxId = 0;

    certificates.forEach((certificate) => {
        const idText = certificate.id;
        if (idText?.startsWith('TK')) {
            const idNum = parseInt(idText.substring(2));
            if (idNum > maxId) {
                maxId = idNum;
            }
        }
    });

    return `TK${String(maxId + 1).padStart(6, '0')}`;
}

function addCertificateRow(id, name, examDate, description) {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="checkbox" style="width: 20px; height: 20px; margin: 5px 0 0 25px;"></td>
        <td>${id}</td>
        <td data-exam-date="${examDate}" data-description="${description}">${name}</td>
        <td>
            <span><img src="../assest/icon/Delete.png" onclick="deleteCertificate('${id}')" alt="Delete" style="width: 20px; height: 20px; cursor: pointer;"></span>
            <span><img src="../assest/icon/Edit.png" onclick="editCertificate('${id}')" alt="Edit" style="width: 20px; height: 20px; cursor: pointer;"></span>
        </td>
    `;

    return newRow;
}

function validateForm() {
    let isValid = true;

    const fields = [
        { id: 'certificate-name', message: 'Vui lòng nhập tên chứng chỉ' },
        { id: 'certificate-date', message: 'Vui lòng nhập ngày cấp bằng' },
        { id: 'certificate-describe', message: 'Vui lòng nhập mô tả chứng chỉ' },
    ];

    document.querySelectorAll('.error-message').forEach((el) => el.remove());

    fields.forEach(({ id, message }) => {
        const input = document.getElementById(id);
        if (!input) return;

        input.style.border = '';

        if (!input.value.trim()) {
            showError(input, message);
            isValid = false;
        }
    });

    return isValid;
}

function showError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <span style="display: flex; align-items: center; gap: 4px;">
            <img src="../assest/icon/icon-fail.png" alt="Error" style="width: 16px; height: 16px;"> ${message}
        </span>
    `;

    const existingError = inputElement.nextElementSibling;
    if (existingError?.classList.contains('error-message')) {
        existingError.remove();
    }

    inputElement.style.border = '1px solid red';
    inputElement.insertAdjacentElement('afterend', errorElement);

    inputElement.addEventListener(
        'input',
        () => {
            inputElement.style.border = '';
            errorElement.remove();
        },
        { once: true }
    );
}

function handleSaveCertificate(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById('certificate-name').value.trim();
    const examDate = document.getElementById('certificate-date').value.trim();
    const description = document.getElementById('certificate-describe').value.trim();

    const certificates = JSON.parse(localStorage.getItem('certificates')) || listCertificates;
    const newId = getNextId();

    certificates.push({ id: newId, name, examDate, description });
    localStorage.setItem('certificates', JSON.stringify(certificates));

    certificateForm.reset();

    const modalElement = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();

    renderTable(certificates);
    toastSuccess.show();
}

function deleteCertificate(id) {
    certificateToDeleteId = id;
    deleteModal.show();
}

document.getElementById('confirmDeleteButton')?.addEventListener('click', () => {
    if (certificateToDeleteId) {
        let certificates = JSON.parse(localStorage.getItem('certificates')) || listCertificates;
        certificates = certificates.filter((certificate) => certificate.id !== certificateToDeleteId);
        localStorage.setItem('certificates', JSON.stringify(certificates));

        certificateToDeleteId = null;
        deleteModal.hide();

        renderTable(certificates);
        toastDelete.show();
    }
});

function editCertificate(id) {
    const rows = Array.from(document.querySelectorAll('#certificateTableBody tr'));
    const rowToEdit = rows.find((row) => row.cells[1].textContent === id);

    if (!rowToEdit) return;

    const name = rowToEdit.cells[2].textContent;
    const examDate = rowToEdit.cells[2].getAttribute('data-exam-date');
    const description = rowToEdit.cells[2].getAttribute('data-description');

    document.getElementById('certificate-name').value = name;
    document.getElementById('certificate-date').value = examDate;
    document.getElementById('certificate-describe').value = description;

    const saveButton = document.getElementById('saveCertificateButton');
    saveButton.textContent = 'Cập nhật';

    saveButton.removeEventListener('click', handleSaveCertificate);
    saveButton.addEventListener('click', function updateHandler(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const newName = document.getElementById('certificate-name').value.trim();
        const newExamDate = document.getElementById('certificate-date').value.trim();
        const newDescription = document.getElementById('certificate-describe').value.trim();

        rowToEdit.cells[2].textContent = newName;
        rowToEdit.cells[2].setAttribute('data-exam-date', newExamDate);
        rowToEdit.cells[2].setAttribute('data-description', newDescription);

        saveToLocalStorage();

        const modalElement = document.getElementById('exampleModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();

        saveButton.textContent = 'Lưu';
        saveButton.removeEventListener('click', updateHandler);
        saveButton.addEventListener('click', handleSaveCertificate);

        toastSuccess.show();
    });

    const editModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    editModal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    if (saveCertificateButton) {
        saveCertificateButton.addEventListener('click', handleSaveCertificate);
    }
    if (prevPageButton) {
        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(JSON.parse(localStorage.getItem('certificates')) || listCertificates);
            }
        });
    }
    if (nextPageButton) {
        nextPageButton.addEventListener('click', () => {
            const certificates = JSON.parse(localStorage.getItem('certificates')) || listCertificates;
            const totalPages = Math.ceil(certificates.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(certificates);
            }
        });
    }
});

function logOut() {
    window.location.href = "Home-page.html";
    localStorage.setItem("loginStatus", JSON.stringify(false));
}

if (loginStatus) {
    console.log("Đã đăng nhập");
    document.getElementById("expiredModal").style.display = "none";

    // // set tài khoản người dùng
    // document.querySelector(".user-name").textContent = `${loggingAccount.username}`
    // document.querySelector(".user-email").textContent = `${loggingAccount.userEmail}`



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