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
    const companyId = getQueryParam('company_id');
    return fetch(apiUrl + 'companies/get_company.php?company_id=' + companyId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const company = data.data;

        // Set values for text inputs
        document.getElementById('company_code').value = company.company_code;
        document.getElementById('name_th').value = company.name_th;
        document.getElementById('name_en').value = company.name_en;
        document.getElementById('search_first').value = company.search_first;
        document.getElementById('search_second').value = company.search_second;
        document.getElementById('a_road').value = company.a_road;
        document.getElementById('a_number').value = company.a_number;
        document.getElementById('a_address').value = company.a_address;
        document.getElementById('a_province').value = company.a_province;
        document.getElementById('a_zip_code').value = company.a_zip_code;
        document.getElementById('zone').value = company.zone;
        document.getElementById('timezone').value = company.timezone;
        document.getElementById('country_name').value = company.country_code + ' - ' + company.country_name;
        document.getElementById('postbox').value = company.postbox;
        document.getElementById('zip_code').value = company.zip_code;
        document.getElementById('company_zip_code').value = company.company_zip_code;
        document.getElementById('language').value = company.language;
        document.getElementById('mobile_phone').value = company.mobile_phone;
        document.getElementById('phone').value = company.phone;
        document.getElementById('phone_ex').value = company.phone_ex;
        document.getElementById('fax').value = company.fax;
        document.getElementById('fax_ex').value = company.fax_ex;
        document.getElementById('email').value = company.email;
        document.getElementById('standard_communication').value = company.standard_communication;
        document.getElementById('comment').value = company.comment;
    } else {
        handleError(data.message);
    }
}

