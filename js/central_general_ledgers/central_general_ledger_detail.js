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
        document.getElementById('company_code').value = central_general_ledger.company_code;

    } else {
        handleError(data.message);
    }
}

