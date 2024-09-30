document.addEventListener("DOMContentLoaded", async function () {
    handleGetCountries();
});

function handleGetCountries(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => {
            return fetchCountryData(mySession.token)
                .then(data => {
                    populateCountryOptions(data);
                    return mySession.token;
                });
        })
        .then(token => fetchData(token))
        .then(data => showData(data))
        .catch(error => handleError(error));

}

function fetchCountryData(token) {
    return fetch(apiUrl + 'countries/get_country_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateCountryOptions(data) {
    const countrySelect = document.getElementById('country_id');
    if (data.status === 'success') {
        data.data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.country_id;
            option.textContent = country.country_code + ' - ' + country.country_name;
            countrySelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
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
        document.getElementById('company_id').value = company.company_id;
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
        document.getElementById('country_id').value = company.country_id;
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

document.getElementById('InputForm').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateData(token, jsonData) {
    return fetch(apiUrl + 'companies/update_company.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

function handleUpdateResponse(data) {
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                location.reload();
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}