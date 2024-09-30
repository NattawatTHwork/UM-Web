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
        document.getElementById('chart_account_code').value = period.chart_account_code;
        document.getElementById('group_account_code').value = period.group_account_code;
        document.getElementById('name_account').value = period.name_account;
        document.getElementById('account_from').value = period.account_from;
        document.getElementById('account_to').value = period.account_to;
    } else {
        handleError(data.message);
    }
}
