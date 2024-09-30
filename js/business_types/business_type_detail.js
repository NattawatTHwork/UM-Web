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
    const business_typeId = getQueryParam('business_type_id');
    return fetch(apiUrl + 'business_types/get_business_type.php?business_type_id=' + business_typeId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const business_type = data.data;
        document.getElementById('business_type_code').value = business_type.business_type_code;
        document.getElementById('description').value = business_type.description;
    } else {
        handleError(data.message);
    }
}
