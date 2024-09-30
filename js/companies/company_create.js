document.addEventListener("DOMContentLoaded", async function () {
    handleGetCountries();
});

function handleGetCountries(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => fetchData(mySession.token))
        .then(data => populateCountryOptions(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
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

document.getElementById('InputForm').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => createData(mySession.token, jsonData))
        .then(response => handleCreateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function createData(token, jsonData) {
    return fetch(apiUrl + 'companies/create_company.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json());
}

function handleCreateResponse(data) {
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
        .then(() => {
            window.location.href = 'company_all.php';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}