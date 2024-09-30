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
    const transaction_period_groupId = getQueryParam('transaction_period_group_id');
    return fetch(apiUrl + 'transaction_period_groups/get_transaction_period_group.php?transaction_period_group_id=' + transaction_period_groupId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const transaction_period_group = data.data;
        document.getElementById('transaction_period_group_code').value = transaction_period_group.transaction_period_group_code;
        document.getElementById('description').value = transaction_period_group.description;
    } else {
        handleError(data.message);
    }
}
