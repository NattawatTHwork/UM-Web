document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        await Promise.all([
            await handleGetCompanyIds(sessionToken.token)
        ]);

        await handleGetDetail(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

function handleGetCompanyIds(token) {
    fetchCompanyIds(token)
        .then(data => populateCompanyIdOptions(data))
        .catch(error => handleError(error));
}

function fetchCompanyIds(token) {
    return fetch(apiUrl + 'companies/get_company_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateCompanyIdOptions(data) {
    const CompanyIdSelect = document.getElementById('company_id');
    if (data.status === 'success') {
        data.data.forEach(company => {
            const option = document.createElement('option');
            option.value = company.company_id;
            option.textContent = company.company_code;
            CompanyIdSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function handleGetDetail(token) {
    fetchData(token)
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    const central_general_ledgerId = getQueryParam('central_general_ledger_id');
    return fetch(apiUrl + 'central_general_ledgers/get_central_general_ledger.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const central_general_ledger = data.data;

        document.getElementById('gl_account').value = central_general_ledger.gl_account;
        document.getElementById('company_id').value = central_general_ledger.company_id;
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
        .then(mySession => updateData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateData(token, jsonData) {
    return fetch(apiUrl + 'central_general_ledgers/update_central_general_ledger.php', {
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
    const CentralGeneralLedgerId = getQueryParam('central_general_ledger_id');

    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'central_general_ledger_update.php?central_general_ledger_id=' + CentralGeneralLedgerId;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}