document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();

        await handleGetChartAccounts(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

function handleGetChartAccounts(token) {
    fetchChartAccounts(token)
        .then(data => populateChartAccountOptions(data))
        .catch(error => handleError(error));
}

function fetchChartAccounts(token) {
    return fetch(apiUrl + 'chart_accounts/get_chart_account_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateChartAccountOptions(data) {
    const ChartAccountSelect = document.getElementById('chart_account_id');
    if (data.status === 'success') {
        data.data.forEach(chart_account => {
            const option = document.createElement('option');
            option.value = chart_account.chart_account_id;
            option.textContent = chart_account.chart_account_code;
            ChartAccountSelect.appendChild(option);
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
    return fetch(apiUrl + 'group_accounts/create_group_account.php', {
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
                window.location.href = 'group_account_all.php?';
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}