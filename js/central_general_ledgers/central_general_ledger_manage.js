// เรียกฟังก์ชันทั้งหมด --------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const central_general_ledgerId = getQueryParam('central_general_ledger_id');
        const sessionToken = await getSessionToken();
        await Promise.all([
            await handleGetCentralGeneralLedger(sessionToken.token, central_general_ledgerId),
            await handleGetGroupAccount(sessionToken.token)
        ]);

        await handleGetGLTypeDetail(sessionToken.token);
        await handleGetGLControlDataDetail(sessionToken.token);
        await handleGetGLInterestBankCreationDetail(sessionToken.token);
        await handleGetGLCADataDetail(sessionToken.token);

    } catch (error) {
        handleError(error);
    }
});

// เรียกข้อมูลบัญชี --------------------------------------------------

function handleGetCentralGeneralLedger(token, central_general_ledgerId) {
    fetchCentralGeneralLedger(token, central_general_ledgerId)
        .then(data => showCentralGeneralLedger(data))
        .catch(error => handleError(error));
}

function fetchCentralGeneralLedger(token, central_general_ledgerId) {
    return fetch(apiUrl + 'central_general_ledgers/get_central_general_ledger.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showCentralGeneralLedger(data) {
    if (data.status === 'success') {
        const central_general_ledger = data.data;

        document.getElementById('gl_account').value = central_general_ledger.gl_account;
        document.getElementById('company_code').value = central_general_ledger.company_code;
        document.getElementById('created_at').value = central_general_ledger.created_at.split(' ')[0];
        document.getElementById('username').value = central_general_ledger.username;

    } else {
        handleError(data.message);
    }
}

// เรียกกลุ่มบัญชี --------------------------------------------------

function handleGetGroupAccount(token) {
    fetchGroupAccount(token)
        .then(data => populateGroupAccountOptions(data))
        .catch(error => handleError(error));
}

function fetchGroupAccount(token) {
    return fetch(apiUrl + 'group_accounts/get_group_account_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateGroupAccountOptions(data) {
    const GroupAccountSelect = document.getElementById('group_account_id');
    if (data.status === 'success') {
        data.data.forEach(group_account => {
            const option = document.createElement('option');
            option.value = group_account.group_account_id;
            option.textContent = group_account.group_account_code + ' - ' + group_account.name_account;
            GroupAccountSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

// เรียกข้อมูล GL Type --------------------------------------------------

function handleGetGLTypeDetail(token) {
    fetchDataGLType(token)
        .then(data => showDataGLType(data))
        .catch(error => handleError(error));
}

function fetchDataGLType(token) {
    const central_general_ledgerId = getQueryParam('central_general_ledger_id');
    return fetch(apiUrl + 'gl_types/get_gl_type.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showDataGLType(data) {
    if (data.status === 'success') {
        const gl_type = data.data;

        document.getElementById('gl_type_id').value = gl_type.gl_type_id;
        document.getElementById('central_general_ledger_id').value = gl_type.central_general_ledger_id;
        document.getElementById('group_account_id').value = gl_type.group_account_id;
        if (gl_type.type_account === 'PL') {
            document.getElementById('pl_account').checked = true;
        } else if (gl_type.type_account === 'BS') {
            document.getElementById('bs_account').checked = true;
        }
        document.getElementById('type_account_description').value = gl_type.type_account_description;
        document.getElementById('short_text').value = gl_type.short_text;
        document.getElementById('long_text').value = gl_type.long_text;
        document.getElementById('tradg_part').value = gl_type.tradg_part;
    } else {
        handleError(data.message);
    }
}

// เรียกข้อมูล Gl Control Data --------------------------------------------------

function handleGetGLControlDataDetail(token) {
    fetchDataGLControlData(token)
        .then(data => showDataGLControlData(data))
        .catch(error => handleError(error));
}

function fetchDataGLControlData(token) {
    const central_general_ledgerId = getQueryParam('central_general_ledger_id');
    return fetch(apiUrl + 'gl_control_datas/get_gl_control_data.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showDataGLControlData(data) {
    if (data.status === 'success') {
        const gl_control_data = data.data;

        document.getElementById('gl_control_data_id').value = gl_control_data.gl_control_data_id;
        document.getElementById('account_currency').value = gl_control_data.account_currency;
        document.getElementById('domestic_currency_balance').checked = gl_control_data.domestic_currency_balance === 't';
        document.getElementById('exchange_rate_difference_key').value = gl_control_data.exchange_rate_difference_key;
        document.getElementById('valuation_group').value = gl_control_data.valuation_group;
        document.getElementById('tax_category').value = gl_control_data.tax_category;
        document.getElementById('post_without_tax').checked = gl_control_data.post_without_tax === 't';
        document.getElementById('reconciliation_account_type').value = gl_control_data.reconciliation_account_type;
        document.getElementById('alternate_account_number').value = gl_control_data.alternate_account_number;
        document.getElementById('externally_managed_account').checked = gl_control_data.externally_managed_account === 't';
        document.getElementById('inflation_key').value = gl_control_data.inflation_key;
        document.getElementById('acceptance_range_group').value = gl_control_data.acceptance_range_group;
        document.getElementById('open_item_management').checked = gl_control_data.open_item_management === 't';
        document.getElementById('display_line_items').checked = gl_control_data.display_line_items === 't';
        document.getElementById('sorting_key').value = gl_control_data.sorting_key;
        document.getElementById('authorization_group').value = gl_control_data.authorization_group;
    } else {
        handleError(data.message);
    }
}

// เรียกข้อมูล Gl Interest Bank Creation --------------------------------------------------

function handleGetGLInterestBankCreationDetail(token) {
    fetchDataGLInterestBankCreation(token)
        .then(data => showDataGLInterestBankCreation(data))
        .catch(error => handleError(error));
}

function fetchDataGLInterestBankCreation(token) {
    const central_general_ledgerId = getQueryParam('central_general_ledger_id');
    return fetch(apiUrl + 'gl_interest_bank_creations/get_gl_interest_bank_creation.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showDataGLInterestBankCreation(data) {
    if (data.status === 'success') {
        const gl_control_data = data.data;

        document.getElementById('gl_interest_bank_creation_id').value = gl_control_data.gl_interest_bank_creation_id;
        document.getElementById('field_status_group').value = gl_control_data.field_status_group;
        document.getElementById('automatic_posting_only').checked = gl_control_data.automatic_posting_only === 't';
        document.getElementById('automatic_incremental_posting').checked = gl_control_data.automatic_incremental_posting === 't';
        document.getElementById('reconciliation_account_input').checked = gl_control_data.reconciliation_account_input === 't';

        document.getElementById('planning_level').value = gl_control_data.planning_level;
        document.getElementById('cash_flow_related').checked = gl_control_data.cash_flow_related === 't';
        document.getElementById('commitment_item').value = gl_control_data.commitment_item;
        document.getElementById('correspondent_bank').value = gl_control_data.correspondent_bank;
        document.getElementById('account_number').value = gl_control_data.account_number;

        document.getElementById('interest_indicator').value = gl_control_data.interest_indicator;
        document.getElementById('interest_calculation_frequency').value = gl_control_data.interest_calculation_frequency;
        document.getElementById('last_interest_calculation_date_key').value = gl_control_data.last_interest_calculation_date_key;
        document.getElementById('last_interest_calculation_date').value = gl_control_data.last_interest_calculation_date;
    } else {
        handleError(data.message);
    }
}

// เรียกข้อมูล Gl CA Data --------------------------------------------------

function handleGetGLCADataDetail(token) {
    fetchDataGLCAData(token)
        .then(data => showDataGLCAData(data))
        .catch(error => handleError(error));
}

function fetchDataGLCAData(token) {
    const central_general_ledgerId = getQueryParam('central_general_ledger_id');
    return fetch(apiUrl + 'gl_ca_datas/get_gl_ca_data.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showDataGLCAData(data) {
    if (data.status === 'success') {
        const gl_control_data = data.data;

        document.getElementById('gl_ca_data_id').value = gl_control_data.gl_ca_data_id;
        document.getElementById('account_assignment_info').value = gl_control_data.account_assignment_info;
        document.getElementById('accounting_note').value = gl_control_data.accounting_note;
        document.getElementById('account_assignment_info_9').value = gl_control_data.account_assignment_info_9;
    } else {
        handleError(data.message);
    }
}

// อัพเดทข้อมูล GL Type --------------------------------------------------

document.getElementById('type_description').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtnTypeDescription');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateGLTypeData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateGLTypeData(token, jsonData) {
    return fetch(apiUrl + 'gl_types/update_gl_type.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

// อัพเดทข้อมูล GL Control Data --------------------------------------------------

document.getElementById('control_data').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtnControlData');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateGLControlDataData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateGLControlDataData(token, jsonData) {
    return fetch(apiUrl + 'gl_control_datas/update_gl_control_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

// อัพเดทข้อมูล Gl Interest Bank Creation --------------------------------------------------

document.getElementById('interest_bank_creation').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtnInterestBankCreation');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateGLInterestBankCreationData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateGLInterestBankCreationData(token, jsonData) {
    return fetch(apiUrl + 'gl_interest_bank_creations/update_gl_interest_bank_creation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

// อัพเดทข้อมูล Gl CA Data --------------------------------------------------

document.getElementById('ca_data').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtnCAData');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateGLCADataData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateGLCADataData(token, jsonData) {
    return fetch(apiUrl + 'gl_ca_datas/update_gl_ca_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

// แสดง response --------------------------------------------------

function handleUpdateResponse(data) {
    const CentralGeneralLedgerId = getQueryParam('central_general_ledger_id');

    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'central_general_ledger_manage.php?central_general_ledger_id=' + CentralGeneralLedgerId;
            });
    } else if (data.status === 'invalid_range') {
        Swal.fire({
            icon: 'warning',
            title: 'เกิดข้อผิดพลาด',
            text: 'กรุณาเลือกกลุ่มบัญชีที่ตรงกับบัญชี G/L',
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}