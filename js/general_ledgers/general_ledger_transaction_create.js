document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        await Promise.all([
            await handleGetCentralGLAccounts(sessionToken.token),
            await handleGetBusinessTypes(sessionToken.token)
        ]);
    } catch (error) {
        handleError(error);
    }
});

// สร้างตัวเลือก บัญชีแยกประเภททั่วไปส่วนกลาง
function handleGetCentralGLAccounts(token) {
    fetchCentralGLAccounts(token)
        .then(data => populateCentralGLAccountOptions(data))
        .catch(error => handleError(error));
}

function fetchCentralGLAccounts(token) {
    return fetch(apiUrl + 'central_general_ledgers/get_central_general_ledger_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateCentralGLAccountOptions(data) {
    const CentralGLAccountSelect = document.getElementById('central_general_ledger_id');
    if (data.status === 'success') {
        data.data.forEach(central_general_ledger => {
            const option = document.createElement('option');
            option.value = central_general_ledger.central_general_ledger_id;
            option.textContent = central_general_ledger.gl_account;
            CentralGLAccountSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

// สร้างตัวเลือก ประเภทธุรกิจ
function handleGetBusinessTypes(token) {
    fetchBusinessTypes(token)
        .then(data => populateBusinessTypeOptions(data))
        .catch(error => handleError(error));
}

function fetchBusinessTypes(token) {
    return fetch(apiUrl + 'business_types/get_business_type_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateBusinessTypeOptions(data) {
    const BusinessTypeSelect = document.getElementById('business_type_id');
    if (data.status === 'success') {
        data.data.forEach(business_type => {
            const option = document.createElement('option');
            option.value = business_type.business_type_id;
            option.textContent = business_type.business_type_code;
            BusinessTypeSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

document.getElementById('InputForm').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => createData(mySession.token, jsonData))
        .then(response => handleCreateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function createData(token, jsonData) {
    return fetch(apiUrl + 'gl_transactions/create_gl_transaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json());
}

function handleCreateResponse(data) {
    if (data.status === 'success') {
        const general_ledger_id = getQueryParam('general_ledger_id');
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
        .then(() => {
            window.location.href = 'general_ledger_update.php?general_ledger_id=' + general_ledger_id;
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}