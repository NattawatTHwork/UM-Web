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
    const period_groupId = getQueryParam('period_group_id');
    return fetch(apiUrl + 'period_groups/get_period_group.php?period_group_id=' + period_groupId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const period_group = data.data;
        document.getElementById('period_group_code').value = period_group.period_group_code;
        document.getElementById('description').value = period_group.description;
    } else {
        handleError(data.message);
    }
}
