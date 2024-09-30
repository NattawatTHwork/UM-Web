document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        
        // สร้างตัวเลือกให้เสร็จหมดก่อน แล้วค่อย fetch ข้อมูล
        await Promise.all([
            handleGetCentralGLAccounts(sessionToken.token),
            handleGetBusinessTypes(sessionToken.token)
        ]);

        // เมื่อสร้างตัวเลือกเสร็จแล้ว fetch ข้อมูลรายละเอียด
        await handleGetDetail(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

// สร้างตัวเลือก บัญชีแยกประเภททั่วไปส่วนกลาง
function handleGetCentralGLAccounts(token) {
    return fetchCentralGLAccounts(token)
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
    return fetchBusinessTypes(token)
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

// แสดงรายละเอียดข้อมูลบัญชีทั่วไป
function handleGetDetail(token) {
    fetchData(token)
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    const gl_transaction_id = getQueryParam('gl_transaction_id');
    return fetch(apiUrl + 'gl_transactions/get_gl_transaction.php?gl_transaction_id=' + gl_transaction_id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const general_ledger = data.data;

        document.getElementById('gl_transaction_id').value = general_ledger.gl_transaction_id;
        document.getElementById('central_general_ledger_id').value = general_ledger.central_general_ledger_id;
        document.getElementById('dc_type').value = general_ledger.dc_type;
        document.getElementById('amount').value = general_ledger.amount;
        document.getElementById('calculate_tax').checked = general_ledger.calculate_tax === 't';
        document.getElementById('business_stablishment').value = general_ledger.business_stablishment;
        document.getElementById('business_type_id').value = general_ledger.business_type_id;
        document.getElementById('determination').value = general_ledger.determination;
        document.getElementById('description').value = general_ledger.description;
    } else {
        handleError(data.message);
    }
}

// อัพเดทข้อมูลบัญชีทั่วไป
document.getElementById('InputForm').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateData(token, jsonData) {
    return fetch(apiUrl + 'gl_transactions/update_gl_transaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json());
}

function handleUpdateResponse(data) {
    const gl_transaction_id = getQueryParam('gl_transaction_id');

    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
        .then(() => {
            window.location.href = 'general_ledger_transaction_update.php?gl_transaction_id=' + gl_transaction_id;
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}
