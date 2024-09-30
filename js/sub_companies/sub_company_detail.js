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

        document.getElementById('company_code').value = company.company_code;
        document.getElementById('name_th_h').value = company.name_th;
        document.getElementById('sub_company_code').value = company.sub_company_code;
        document.getElementById('sub_company_name').value = company.sub_company_name;

        document.getElementById('cnpj_bus_place').value = company.cnpj_bus_place;
        document.getElementById('state_tax').value = company.state_tax;
        document.getElementById('munic_tax').value = company.munic_tax;
        document.getElementById('bp_cfop_cat').value = company.bp_cfop_cat;

        document.getElementById('representative_name').value = company.representative_name;
        document.getElementById('business_type').value = company.business_type_code + ' - ' + company.description;
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
    } else {
        handleError(data.message);
    }
}

