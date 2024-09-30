document.addEventListener("DOMContentLoaded", async function() {
    handleGetDetail();
});

function handleGetDetail(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => fetchData(mySession.token))
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    const chartAccountId = getQueryParam('chart_account_id');
    return fetch(apiUrl + 'chart_accounts/get_chart_account.php?chart_account_id=' + chartAccountId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const chart_account = data.data;

        document.getElementById('chart_account_id').value = chart_account.chart_account_id;
        document.getElementById('chart_account_code').value = chart_account.chart_account_code;
        document.getElementById('language').value = chart_account.language;
        document.getElementById('account_length').value = chart_account.account_length;
        document.getElementById('collection_control').value = chart_account.collection_control;
        document.getElementById('chart_account_group').value = chart_account.chart_account_group;
        document.getElementById('suspend').checked = chart_account.suspend === 't';
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
    jsonData.suspend = document.getElementById('suspend').checked ? "true" : "false";
    return fetch(apiUrl + 'chart_accounts/update_chart_account.php', {
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
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                location.reload();
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}