document.addEventListener("DOMContentLoaded", async function () {
    handleGetPeriodGroups();
});

function handleGetPeriodGroups(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => fetchPeriodGroups(mySession.token))
        .then(data => populatePeriodGroupOptions(data))
        .catch(error => handleError(error));
}

function fetchPeriodGroups(token) {
    return fetch(apiUrl + 'period_groups/get_period_group_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populatePeriodGroupOptions(data) {
    const periodGroupSelect = document.getElementById('period_group_id');
    if (data.status === 'success') {
        data.data.forEach(periodGroup => {
            const option = document.createElement('option');
            option.value = periodGroup.period_group_id;
            option.textContent = periodGroup.period_group_code;
            periodGroupSelect.appendChild(option);
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
    jsonData.fiscal_year_check = document.getElementById('fiscal_year_check').checked ? "true" : "false";
    jsonData.calendar_year_check = document.getElementById('calendar_year_check').checked ? "true" : "false";
    jsonData.posting_period_count = document.getElementById('posting_period_count').value || 0;
    jsonData.special_period_count = document.getElementById('special_period_count').value || 0;
    
    return fetch(apiUrl + 'fiscal_years/create_fiscal_year.php', {
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
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
        .then(() => {
            window.location.href = 'fiscal_year_all.php';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}