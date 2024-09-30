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
    const TransactionPeriodId = getQueryParam('transaction_period_id');
    return fetch(apiUrl + 'transaction_periods/get_transaction_period.php?transaction_period_id=' + TransactionPeriodId, {
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
        document.getElementById('transaction_period_group_code').value = period.transaction_period_group_code;
        document.getElementById('transaction_period_type_code').value = period.transaction_period_type_code;
        document.getElementById('account_from').value = period.account_from;
        document.getElementById('account_to').value = period.account_to;
        document.getElementById('period_from_first').value = period.period_from_first;
        document.getElementById('period_from_first_year').value = period.period_from_first_year;
        document.getElementById('period_to_first').value = period.period_to_first;
        document.getElementById('period_to_first_year').value = period.period_to_first_year;
        document.getElementById('period_from_second').value = period.period_from_second;
        document.getElementById('period_from_second_year').value = period.period_from_second_year;
        document.getElementById('period_to_second').value = period.period_to_second;
        document.getElementById('period_to_second_year').value = period.period_to_second_year;
        document.getElementById('augr').value = period.augr;

    } else {
        handleError(data.message);
    }
}
