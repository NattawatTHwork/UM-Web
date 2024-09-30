document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();

        await handleGetCountries(sessionToken.token);
        await handleGetBusinessTypes(sessionToken.token);

        const data = await fetchData(sessionToken.token);
        showData(data);
    } catch (error) {
        handleError(error);
    }
});

async function handleGetCountries(token) {
    try {
        const data = await fetchCountries(token);
        populateCountryOptions(data);
    } catch (error) {
        handleError(error);
    }
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

async function handleGetBusinessTypes(token) {
    try {
        const data = await fetchBusinessTypes(token);
        populateBusinessTypeOptions(data);
    } catch (error) {
        handleError(error);
    }
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

function fetchData(token) {
    const subCompanyId = getQueryParam('sub_company_id');
    return fetch(apiUrl + 'sub_companies/get_sub_company.php?sub_company_id=' + subCompanyId, {
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

        document.getElementById('sub_company_id').value = company.sub_company_id;
        document.getElementById('company_code').value = company.company_code;
        document.getElementById('name_th_h').value = company.name_th;
        document.getElementById('sub_company_code').value = company.sub_company_code;
        document.getElementById('sub_company_name').value = company.sub_company_name;

        document.getElementById('cnpj_bus_place').value = company.cnpj_bus_place;
        document.getElementById('state_tax').value = company.state_tax;
        document.getElementById('munic_tax').value = company.munic_tax;
        document.getElementById('bp_cfop_cat').value = company.bp_cfop_cat;

        document.getElementById('representative_name').value = company.representative_name;
        document.getElementById('business_type_id').value = company.business_type_id;
        document.getElementById('industry_type').value = company.industry_type;
        document.getElementById('tax_number1').value = company.tax_number1;
        document.getElementById('tax_number2').value = company.tax_number2;
        document.getElementById('tax_office').value = company.tax_office;

        document.getElementById('sub_name_th').value = company.sub_name_th;
        document.getElementById('name_th').value = company.name_th;
        document.getElementById('sub_name_en').value = company.sub_name_en;
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
    return fetch(apiUrl + 'sub_companies/update_sub_company.php', {
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