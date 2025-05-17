const savePartnerButton = document.getElementById('savePartnerButton');
const tableBody = document.getElementById('partnerTableBody');
const partnerForm = document.getElementById('partnerForm');
const previewImageElement = document.getElementById('preview-image');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const toastDelete = new bootstrap.Toast(document.getElementById('toastDelete'));
const toastSuccess = new bootstrap.Toast(document.getElementById('toastSuccess'));
const prevPageButton = document.getElementById('prevPageButton');
const nextPageButton = document.getElementById('nextPageButton');
const searchInput = document.getElementById('searchInput');

let partnerToDeleteId = null;
let currentPage = 1;
const itemsPerPage = 5;

let listPartner = [
    { id: 'TK001', name: 'FPT', specialization: 'CNTT, Marketing', address: 'Hà Nội' },
];

const specializationColors = {
    'CNTT': '#E1F5FE',
    'Marketing': '#E8F5E9',
    'Design': '#F3E5F5',
    'Automative': '#FFF3E0',
    'QTKD': '#E0F7FA',
    'Kinh tế': '#FFEBEE',
    'Ngôn ngữ': '#E8EAF6',
    'Kỹ thuật': '#E0F2F1',
};

function getSpecializationColor(specialization) {
    const foundKey = Object.keys(specializationColors).find(
        (key) => key.toLowerCase() === specialization.toLowerCase()
    );
    return foundKey ? specializationColors[foundKey] : '#ECEFF1';
}

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

function renderTable(partners) {
    if (!tableBody) return;
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const partnersToDisplay = partners.slice(startIndex, endIndex);

    partnersToDisplay.forEach((partner) => {
        tableBody.appendChild(
            addPartnerRow(partner.id, partner.name, partner.specialization, partner.address)
        );
    });

    updatePagination(partners.length);
}

function saveToLocalStorage() {
    const rows = Array.from(document.querySelectorAll('#partnerTableBody tr'));
    const partners = rows.map((row) => ({
        id: row.cells[1].textContent.trim(),
        name: row.cells[2].textContent.trim(),
        specialization: row.cells[3].getAttribute('data-full-specialization'),
        address: row.cells[5].textContent.trim(),
    }));

    localStorage.setItem('partners', JSON.stringify(partners));
    renderTable(partners);
}

function loadFromLocalStorage() {
    const partners = JSON.parse(localStorage.getItem('partners')) || listPartner;
    renderTable(partners);
}

function getNextId() {
    const partners = JSON.parse(localStorage.getItem('partners')) || listPartner;
    let maxId = 0;

    partners.forEach((partner) => {
        const idText = partner.id;
        if (idText?.startsWith('TK')) {
            const idNum = parseInt(idText.substring(2));
            if (idNum > maxId) {
                maxId = idNum;
            }
        }
    });

    return `TK${String(maxId + 1).padStart(3, '0')}`;
}

function addPartnerRow(id, name, specialization, address) {
    const newRow = document.createElement('tr');
    const specializations = specialization.split(',').map((s) => s.trim());
    const maxVisibleTags = 3;

    let specializationHTML = '';
    if (specializations.length > 0) {
        const visibleTags = specializations.slice(0, maxVisibleTags);
        const hiddenCount = specializations.length - maxVisibleTags;

        visibleTags.forEach((spec) => {
            const color = getSpecializationColor(spec);
            specializationHTML += `<span class="specialization-tag" style="background-color: ${color}">${spec}</span>`;
        });

        if (hiddenCount > 0) {
            const hiddenTags = specializations.slice(maxVisibleTags).join(', ');
            specializationHTML += `<span class="more-tags" title="${hiddenTags}">+${hiddenCount}</span>`;
        }
    }

    newRow.innerHTML = `
        <td><input type="checkbox" style="width: 20px; height: 20px; margin: 5px 0 0 25px;"></td>
        <td>${id}</td>
        <td>${name}</td>
        <td class="specialization-cell" data-full-specialization="${specialization}">${specializationHTML}</td>
        <td>19</td>
        <td>${address}</td>
        <td>
            <span><img src="../assest/icon/Delete.png" onclick="deletePartner('${id}')" alt="Delete" style="width: 20px; height: 20px; cursor: pointer;"></span>
            <span><img src="../assest/icon/Edit.png" onclick="editPartner('${id}')" alt="Edit" style="width: 20px; height: 20px; cursor: pointer;"></span>
        </td>
    `;

    newRow.style.cursor = 'pointer';
    newRow.style.transition = 'background-color 0.3s ease';
    newRow.addEventListener('mouseover', () => {
        newRow.style.backgroundColor = '#f0f0f0';
    });
    newRow.addEventListener('mouseout', () => {
        newRow.style.backgroundColor = '';
    });
    newRow.addEventListener('click', (e) => {
        if (e.target.tagName !== 'IMG' && e.target.tagName !== 'INPUT') {
            if (name === 'FPT') {
                window.location.href = '../html/details-partner.html';
            }
        }
    });

    return newRow;
}

function validateForm() {
    let isValid = true;

    const fields = [
        { id: 'partner-name', message: 'Vui lòng nhập tên đối tác' },
        { id: 'partner-address', message: 'Vui lòng nhập địa chỉ đối tác' },
        { id: 'partner-website', message: 'Vui lòng nhập website đối tác' },
        { id: 'partner-email', message: 'Vui lòng nhập email đối tác' },
        { id: 'partner-hotline', message: 'Vui lòng nhập số điện thoại đối tác' },
        { id: 'partner-specialization', message: 'Vui lòng nhập chuyên ngành đối tác' },
    ];

    document.querySelectorAll('.error-message').forEach((el) => el.remove());

    fields.forEach(({ id, message }) => {
        const input = document.getElementById(id);
        if (!input) return;

        input.style.border = '';

        if (!input.value.trim()) {
            showError(input, message);
            isValid = false;
        } else if (id === 'partner-email') {
            const emailValue = input.value.trim();
            if (!emailValue.includes('@') || !emailValue.endsWith('.com')) {
                showError(input, 'Email không hợp lệ. Vui lòng nhập dạng example@domain.com.');
                isValid = false;
            }
        } else if (id === 'partner-hotline') {
            const phoneValue = input.value.trim();
            if (phoneValue.length !== 10 || !/^\d{10}$/.test(phoneValue)) {
                showError(input, 'Số điện thoại phải là 10 chữ số.');
                isValid = false;
            }
        } else if (id === 'partner-website') {
            const websiteValue = input.value.trim();
            if (!websiteValue.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/)) {
                showError(input, 'Website không hợp lệ. Vui lòng nhập dạng https://example.com.');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(inputElement, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
    errorElement.style.marginTop = '4px';
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

function handleSavePartner(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const name = document.getElementById('partner-name').value.trim();
    const address = document.getElementById('partner-address').value.trim();
    const website = document.getElementById('partner-website').value.trim();
    const hotline = document.getElementById('partner-hotline').value.trim();
    const email = document.getElementById('partner-email').value.trim();
    const specialization = document.getElementById('partner-specialization').value.trim();

    const partners = JSON.parse(localStorage.getItem('partners')) || listPartner;
    const newId = getNextId();

    partners.push({ id: newId, name, specialization, address });
    localStorage.setItem('partners', JSON.stringify(partners));

    partnerForm.reset();
    previewImageElement.src = '../assest/icon/Avatar.png';

    const modalElement = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    modalInstance.hide();

    renderTable(partners);
    toastSuccess.show();
}

function deletePartner(id) {
    partnerToDeleteId = id;
    deleteModal.show();
}

document.getElementById('confirmDeleteButton')?.addEventListener('click', () => {
    if (partnerToDeleteId) {
        let partners = JSON.parse(localStorage.getItem('partners')) || listPartner;
        partners = partners.filter((partner) => partner.id !== partnerToDeleteId);
        localStorage.setItem('partners', JSON.stringify(partners));

        partnerToDeleteId = null;
        deleteModal.hide();

        renderTable(partners);
        toastDelete.show();
    }
});

function editPartner(id) {
    const rows = Array.from(document.querySelectorAll('#partnerTableBody tr'));
    const rowToEdit = rows.find((row) => row.cells[1].textContent === id);

    if (!rowToEdit) return;

    const name = rowToEdit.cells[2].textContent;
    const specialization = rowToEdit.querySelector('.specialization-cell').getAttribute('data-full-specialization');
    const address = rowToEdit.cells[5].textContent;

    document.getElementById('partner-name').value = name;
    document.getElementById('partner-specialization').value = specialization;
    document.getElementById('partner-address').value = address;

    const saveButton = document.getElementById('savePartnerButton');
    saveButton.textContent = 'Cập nhật';

    saveButton.removeEventListener('click', handleSavePartner);
    saveButton.addEventListener('click', function updateHandler(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const newName = document.getElementById('partner-name').value.trim();
        const newSpecialization = document.getElementById('partner-specialization').value.trim();
        const newAddress = document.getElementById('partner-address').value.trim();

        rowToEdit.cells[2].textContent = newName;
        rowToEdit.querySelector('.specialization-cell').setAttribute('data-full-specialization', newSpecialization);
        rowToEdit.cells[5].textContent = newAddress;

        const specializations = newSpecialization.split(',').map((s) => s.trim());
        const maxVisibleTags = 3;
        let specializationHTML = '';

        if (specializations.length > 0) {
            const visibleTags = specializations.slice(0, maxVisibleTags);
            const hiddenCount = specializations.length - maxVisibleTags;

            visibleTags.forEach((spec) => {
                const color = getSpecializationColor(spec);
                specializationHTML += `<span class="specialization-tag" style="background-color: ${color}">${spec}</span>`;
            });

            if (hiddenCount > 0) {
                const hiddenTags = specializations.slice(maxVisibleTags).join(', ');
                specializationHTML += `<span class="more-tags" title="${hiddenTags}">+${hiddenCount}</span>`;
            }
        }

        rowToEdit.querySelector('.specialization-cell').innerHTML = specializationHTML;

        saveToLocalStorage();

        const modalElement = document.getElementById('exampleModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();

        saveButton.textContent = 'Thêm đối tác';
        saveButton.removeEventListener('click', updateHandler);
        saveButton.addEventListener('click', handleSavePartner);

        toastSuccess.show();
    });

    const editModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    editModal.show();
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImageElement.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        alert('Vui lòng chọn file hình ảnh hợp lệ.');
    }
}

function triggerFile() {
    const fileInput = document.getElementById('file-input');
    if (fileInput) fileInput.click();
}

function searchPartners() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const partners = JSON.parse(localStorage.getItem('partners')) || listPartner;

    const filteredPartners = partners.filter(partner =>
        partner.id.toLowerCase().includes(searchTerm) ||
        partner.name.toLowerCase().includes(searchTerm) ||
        partner.specialization.toLowerCase().includes(searchTerm) ||
        partner.address.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;
    renderTable(filteredPartners);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    const uploadInput = document.getElementById('upload-input');
    if (uploadInput) {
        uploadInput.addEventListener('change', handleImageUpload);
    }
    if (savePartnerButton) {
        savePartnerButton.addEventListener('click', handleSavePartner);
    }
    if (prevPageButton) {
        prevPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable(JSON.parse(localStorage.getItem('partners')) || listPartner);
            }
        });
    }
    if (nextPageButton) {
        nextPageButton.addEventListener('click', () => {
            const partners = JSON.parse(localStorage.getItem('partners')) || listPartner;
            const totalPages = Math.ceil(partners.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable(partners);
            }
        });
    }
    if (searchInput) {
        searchInput.addEventListener('input', searchPartners);
    }
});

function logOut() {
    window.location.href = "Home-page.html";
    localStorage.setItem("loginStatus", JSON.stringify(false));
}