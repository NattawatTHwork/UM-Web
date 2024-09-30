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

