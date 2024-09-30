document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();

        await Promise.all([
            handleGetGroupAccounts(sessionToken.token),
        ]);

        await handleGetDetail(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

function handleGetGroupAccounts(token) {
    return fetchGroupAccounts(token)
        .then(data => populateGroupAccountOptions(data))
        .catch(error => handleError(error));
}

function fetchGroupAccounts(token) {
    return fetch(apiUrl + 'chart_accounts/get_chart_account_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateGroupAccountOptions(data) {
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

function handleGetDetail(token) {
    fetchData(token)
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    const GroupAccountId = getQueryParam('group_account_id');
    return fetch(apiUrl + 'group_accounts/get_group_account.php?group_account_id=' + GroupAccountId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const period = data.data;

        document.getElementById('chart_account_id').value = period.chart_account_id;
        document.getElementById('group_account_code').value = period.group_account_code;
        document.getElementById('name_account').value = period.name_account;
        document.getElementById('account_from').value = period.account_from;
        document.getElementById('account_to').value = period.account_to;
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
    return fetch(apiUrl + 'group_accounts/update_group_account.php', {
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
    const GroupAccountId = getQueryParam('group_account_id');
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'group_account_update.php?group_account_id=' + GroupAccountId;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}
