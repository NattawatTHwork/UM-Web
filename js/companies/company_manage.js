document.addEventListener("DOMContentLoaded", async function () {
    handleGetCompanies();
});

function handleGetCompanies(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => {
            return Promise.all([
                fetchChartAccountData(mySession.token),
                fetchFiscalYearData(mySession.token),
                fetchTransactionPeriodGroupData(mySession.token)
            ])
            .then(([chartAccountData, fiscalYearData, transactionPeriodGroupData]) => {
                populateChartAccountOptions(chartAccountData);
                populateFiscalYearOptions(fiscalYearData);
                populateTransactionPeriodGroupOptions(transactionPeriodGroupData);
                return mySession.token;
            });
        })
        .then(token => fetchData(token))
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchChartAccountData(token) {
    return fetch(apiUrl + 'chart_accounts/get_chart_account_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

function fetchFiscalYearData(token) {
    return fetch(apiUrl + 'fiscal_years/get_fiscal_year_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

function fetchTransactionPeriodGroupData(token) {
    return fetch(apiUrl + 'transaction_period_groups/get_transaction_period_group_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json());
}

function populateChartAccountOptions(data) {
    const chartAccountSelect = document.getElementById('chart_account_id');
    if (data.status === 'success') {
        data.data.forEach(chart_account => {
            const option = document.createElement('option');
            option.value = chart_account.chart_account_id;
            option.textContent = chart_account.chart_account_code;
            chartAccountSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function populateFiscalYearOptions(data) {
    const fiscalYearSelect = document.getElementById('fiscal_year_id');
    if (data.status === 'success') {
        data.data.forEach(fiscal_year => {
            const option = document.createElement('option');
            option.value = fiscal_year.fiscal_year_id;
            option.textContent = fiscal_year.fiscal_year_code;
            fiscalYearSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function populateTransactionPeriodGroupOptions(data) {
    const transactionPeriodGroupSelect = document.getElementById('transaction_period_group_id');
    if (data.status === 'success') {
        data.data.forEach(transaction_period_group => {
            const option = document.createElement('option');
            option.value = transaction_period_group.transaction_period_group_id;
            option.textContent = transaction_period_group.transaction_period_group_code;
            transactionPeriodGroupSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function fetchData(token) {
    const companyId = getQueryParam('company_id');
    return fetch(apiUrl + 'companies/get_company_additional.php?company_id=' + companyId, {
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
        document.getElementById('chart_account_id').value = company.chart_account_id;
        document.getElementById('chart_account_country').value = company.chart_account_country;
        document.getElementById('company_second').value = company.company_second;
        document.getElementById('fm_zone').value = company.fm_zone;
        document.getElementById('credit_control_zone').value = company.credit_control_zone;
        document.getElementById('fiscal_year_id').value = company.fiscal_year_id;
        document.getElementById('non_system_company_code').checked = company.non_system_company_code === 't';
        document.getElementById('company_all_code').value = company.company_all_code;
        document.getElementById('actual_company_code').checked = company.actual_company_code === 't';
        document.getElementById('registration_number_vat').value = company.registration_number_vat;
        document.getElementById('doc_record_view').value = company.doc_record_view;
        document.getElementById('biz_fin_stmt').checked = company.biz_fin_stmt === 't';
        document.getElementById('field_status_set').value = company.field_status_set;
        document.getElementById('fiscal_year_prop').checked = company.fiscal_year_prop === 't';
        document.getElementById('transaction_period_group_id').value = company.transaction_period_group_id;
        document.getElementById('init_val_date').checked = company.init_val_date === 't';
        document.getElementById('max_ex_rate_diff').value = company.max_ex_rate_diff;
        document.getElementById('no_forex_diff_lc_clear').checked = company.no_forex_diff_lc_clear === 't';
        document.getElementById('sample_acc_rule_set').value = company.sample_acc_rule_set;
        document.getElementById('tax_base_net_val').checked = company.tax_base_net_val === 't';
        document.getElementById('workflow_select').value = company.workflow_select;
        document.getElementById('net_discount_base').checked = company.net_discount_base === 't';
        document.getElementById('inflation_method').value = company.inflation_method;
        document.getElementById('fin_asset_mgmt').checked = company.fin_asset_mgmt === 't';
        document.getElementById('tax_currency_conv').value = company.tax_currency_conv;
        document.getElementById('proc_acc_proc').checked = company.proc_acc_proc === 't';
        document.getElementById('co_area').value = company.co_area;
        document.getElementById('allow_neg_entry').checked = company.allow_neg_entry === 't';
        document.getElementById('current_cogs').value = company.current_cogs;
        document.getElementById('split_quantity').checked = company.split_quantity === 't';
        document.getElementById('cash_mgmt_enabled').checked = company.cash_mgmt_enabled === 't';
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
    return fetch(apiUrl + 'companies/update_company_additional.php', {
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