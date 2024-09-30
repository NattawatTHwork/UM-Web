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
    const periodId = getQueryParam('period_id');
    return fetch(apiUrl + 'periods/get_period.php?period_id=' + periodId, {
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

        document.getElementById('period_code').value = period.period_code;
        document.getElementById('number_month').value = period.number_month;
        document.getElementById('number_day').value = period.number_day;
        document.getElementById('change_year').value = period.change_year;
        document.getElementById('text_period_en').value = period.text_period_en;
        document.getElementById('text_period_th').value = period.text_period_th;

    } else {
        handleError(data.message);
    }
}

