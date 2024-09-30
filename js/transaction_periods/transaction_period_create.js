document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();

        await handleGetTransactionPeriodTypes(sessionToken.token);
        await handleGetTransactionPeriodGroups(sessionToken.token);
        // await handleGetPeriods(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

function handleGetTransactionPeriodTypes(token) {
    fetchTransactionPeriodTypes(token)
        .then(data => populateTransactionPeriodTypeOptions(data))
        .catch(error => handleError(error));
}

function fetchTransactionPeriodTypes(token) {
    return fetch(apiUrl + 'transaction_period_types/get_transaction_period_type_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateTransactionPeriodTypeOptions(data) {
    const TransactionPeriodTypeSelect = document.getElementById('transaction_period_type_id');
    if (data.status === 'success') {
        data.data.forEach(transaction_period_type => {
            const option = document.createElement('option');
            option.value = transaction_period_type.transaction_period_type_id;
            option.textContent = transaction_period_type.transaction_period_type_code;
            TransactionPeriodTypeSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function handleGetTransactionPeriodGroups(token) {
    fetchTransactionPeriodGroups(token)
        .then(data => populateTransactionPeriodGroupOptions(data))
        .catch(error => handleError(error));
}

function fetchTransactionPeriodGroups(token) {
    return fetch(apiUrl + 'transaction_period_groups/get_transaction_period_group_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateTransactionPeriodGroupOptions(data) {
    const TransactionPeriodGroupSelect = document.getElementById('transaction_period_group_id');
    if (data.status === 'success') {
        data.data.forEach(transaction_period_group => {
            const option = document.createElement('option');
            option.value = transaction_period_group.transaction_period_group_id;
            option.textContent = transaction_period_group.transaction_period_group_code;
            TransactionPeriodGroupSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

// function handleGetPeriods(token) {
//     fetchPeriods(token)
//         .then(data => populatePeriodOptions(data))
//         .catch(error => handleError(error));
// }

// function fetchPeriods(token) {
//     const FiscalYearId = getQueryParam('fiscal_year_id');
//     return fetch(apiUrl + 'periods/get_period_all.php?fiscal_year_id=' + FiscalYearId, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => response.json());
// }

// function populatePeriodOptions(data) {
//     const period_from_firstSelect = document.getElementById('period_from_first');
//     const period_to_firstSelect = document.getElementById('period_to_first');
//     const period_from_secondSelect = document.getElementById('period_from_second');
//     const period_to_secondSelect = document.getElementById('period_to_second');

//     if (data.status === 'success') {
//         data.data.forEach(period => {
//             const optionFromFirst = document.createElement('option');
//             optionFromFirst.value = period.period_id;
//             optionFromFirst.textContent = period.period_code;

//             const optionToFirst = document.createElement('option');
//             optionToFirst.value = period.period_id;
//             optionToFirst.textContent = period.period_code;

//             const optionFromSecond = document.createElement('option');
//             optionFromSecond.value = period.period_id;
//             optionFromSecond.textContent = period.period_code;

//             const optionToSecond = document.createElement('option');
//             optionToSecond.value = period.period_id;
//             optionToSecond.textContent = period.period_code;

//             period_from_firstSelect.appendChild(optionFromFirst);
//             period_to_firstSelect.appendChild(optionToFirst);
//             period_from_secondSelect.appendChild(optionFromSecond);
//             period_to_secondSelect.appendChild(optionToSecond);
//         });
//     } else {
//         handleError(data.message);
//     }
// }

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
    return fetch(apiUrl + 'transaction_periods/create_transaction_period.php', {
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
    const TransactionPeriodGroupId = getQueryParam('transaction_period_group_id');
    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'transaction_period_all.php?transaction_period_group_id=' + TransactionPeriodGroupId;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}