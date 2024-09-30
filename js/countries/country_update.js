document.addEventListener("DOMContentLoaded", async function () {
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
    const countryId = getQueryParam('country_id');
    return fetch(apiUrl + 'countries/get_country.php?country_id=' + countryId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const country = data.data;
        document.getElementById('country_id').value = country.country_id;
        document.getElementById('country_code').value = country.country_code;
        document.getElementById('other_country_key').value = country.other_country_key;
        document.getElementById('country_name').value = country.country_name;
        document.getElementById('full_name').value = country.full_name;
        document.getElementById('nationality').value = country.nationality;
        document.getElementById('full_nationality').value = country.full_nationality;
        document.getElementById('country_vehicle_key').value = country.country_vehicle_key;
        document.getElementById('language_key').value = country.language_key;
        document.getElementById('major_currency_index').value = country.major_currency_index;
        document.getElementById('major_currency').value = country.major_currency;
        document.getElementById('trade_statistic_abbreviation').value = country.trade_statistic_abbreviation;
        document.getElementById('step').value = country.step;
        document.getElementById('iso_key').value = country.iso_key;
        document.getElementById('three_iso_key').value = country.three_iso_key;
        document.getElementById('intrastat_key').value = country.intrastat_key;

        document.getElementById('member_euro').checked = country.member_euro === 't';
        document.getElementById('capital_goods_indicator').checked = country.capital_goods_indicator === 't';

        document.getElementById('address_outline_key').value = country.address_outline_key;
        document.getElementById('standard_name_format').value = country.standard_name_format;
        document.getElementById('type_country_name').checked = country.type_country_name === 't';

        document.getElementById('date_format').value = country.date_format;
        document.getElementById('decimal_format').value = country.decimal_format;
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
    jsonData.member_euro = document.getElementById('member_euro').checked ? "true" : "false";
    jsonData.capital_goods_indicator = document.getElementById('capital_goods_indicator').checked ? "true" : "false";
    jsonData.type_country_name = document.getElementById('type_country_name').checked ? "true" : "false";

    return fetch(apiUrl + 'countries/update_country.php', {
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