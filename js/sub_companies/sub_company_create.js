document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken(); // รับค่า sessionToken เพียงครั้งเดียว

        await handleGetCountries(sessionToken.token); // ส่ง token ไปยังฟังก์ชันที่ต้องการ
        await handleGetBusinessTypes(sessionToken.token); // ส่ง token ไปยังฟังก์ชันที่ต้องการ
    } catch (error) {
        handleError(error);
    }
});

function handleGetCountries(token) {
    fetchCountries(token)
        .then(data => populateCountryOptions(data))
        .catch(error => handleError(error));
}

function fetchCountries(token) {
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

function handleGetBusinessTypes(token) {
    fetchBusinessTypes(token)
        .then(data => populateBusinessTypeOptions(data))
        .catch(error => handleError(error));
}

function fetchBusinessTypes(token) {
    return fetch(apiUrl + 'business_types/get_business_type_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

function populateBusinessTypeOptions(data) {
    const businessTypeSelect = document.getElementById('business_type_id');
    if (data.status === 'success') {
        data.data.forEach(type => {
            const option = document.createElement('option');
            option.value = type.business_type_id;
            option.textContent = type.business_type_code + ' - ' + type.description;
            businessTypeSelect.appendChild(option);
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
    return fetch(apiUrl + 'sub_companies/create_sub_company.php', {
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
    const CompanyId = getQueryParam('company_id');
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
        .then(() => {
            window.location.href = 'sub_company_all.php?company_id=' + CompanyId;
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}