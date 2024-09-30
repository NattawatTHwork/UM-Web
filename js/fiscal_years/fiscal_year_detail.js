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
    const fiscal_yearId = getQueryParam('fiscal_year_id');
    return fetch(apiUrl + 'fiscal_years/get_fiscal_year.php?fiscal_year_id=' + fiscal_yearId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const fiscal_year = data.data;
        document.getElementById('fiscal_year_code').value = fiscal_year.fiscal_year_code;
        document.getElementById('description').value = fiscal_year.description;
        document.getElementById('fiscal_year_check').checked = fiscal_year.fiscal_year_check === 't';
        document.getElementById('calendar_year_check').checked = fiscal_year.calendar_year_check === 't';
        document.getElementById('posting_period_count').value = fiscal_year.posting_period_count;
        document.getElementById('special_period_count').value = fiscal_year.special_period_count;
        document.getElementById('period_group_code').value = fiscal_year.period_group_code;
    } else {
        handleError(data.message);
    }
}
