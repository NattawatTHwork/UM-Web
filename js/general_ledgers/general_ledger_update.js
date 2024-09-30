document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        const general_ledger_id = getQueryParam('general_ledger_id');

        // await Promise.all([
        //     await handleGetCompanyIds(sessionToken.token)
        // ]);

        await handleGetDetail(sessionToken.token, general_ledger_id);
        await handleGetGLTransactionAll(sessionToken.token, general_ledger_id);
    } catch (error) {
        handleError(error);
    }
});

// function handleGetCompanyIds(token) {
//     fetchCompanyIds(token)
//         .then(data => populateCompanyIdOptions(data))
//         .catch(error => handleError(error));
// }

// function fetchCompanyIds(token) {
//     return fetch(apiUrl + 'companies/get_company_all.php', {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//         }
//     })
//         .then(response => response.json());
// }

// function populateCompanyIdOptions(data) {
//     const CompanyIdSelect = document.getElementById('company_id');
//     if (data.status === 'success') {
//         data.data.forEach(company => {
//             const option = document.createElement('option');
//             option.value = company.company_id;
//             option.textContent = company.company_code;
//             CompanyIdSelect.appendChild(option);
//         });
//     } else {
//         handleError(data.message);
//     }
// }

// แสดงรายละเอียดข้อมูลบัญชีทั่วไป
function handleGetDetail(token, general_ledger_id) {
    fetchData(token, general_ledger_id)
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token, general_ledger_id) {
    return fetch(apiUrl + 'general_ledgers/get_general_ledger.php?general_ledger_id=' + general_ledger_id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const general_ledger = data.data;

        document.getElementById('general_ledger_id').value = general_ledger.general_ledger_id;
        document.getElementById('document_date').value = general_ledger.document_date;
        document.getElementById('posting_date').value = general_ledger.posting_date;
        document.getElementById('reference').value = general_ledger.reference;
        document.getElementById('document_header_text').value = general_ledger.document_header_text;
        document.getElementById('document_type').value = general_ledger.document_type;
        document.getElementById('intercompany_number').value = general_ledger.intercompany_number;
        document.getElementById('branch_number').value = general_ledger.branch_number;
        document.getElementById('currency').value = general_ledger.currency;
        document.getElementById('company_code').value = general_ledger.company_code;
    } else {
        handleError(data.message);
    }
}

// แสดงข้อมูล General Ledger Transactions
function handleGetGLTransactionAll(token, general_ledger_id) {
    fetchGLTransactionData(token, general_ledger_id)
        .then(data => displayTables(data))
        .catch(error => handleError(error));
}

function fetchGLTransactionData(token, general_ledger_id) {
    return fetch(apiUrl + 'gl_transactions/get_gl_transaction_all.php?general_ledger_id=' + general_ledger_id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function displayTables(datas) {
    let html = '';
    const noDataHtml = '<tr><td></td><td></td><td>ไม่มีข้อมูล</td><td></td></tr>';
    if (datas.status === 'success') {
        if (datas.data.length > 0) {
            datas.data.forEach(data => {
                html += '<tr>';
                html += `<td>${data.gl_account}</td>
                    <td>${data.dc_type}</td>
                    <td>${data.amount}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ตัวเลือก
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="general_ledger_transaction_update.php?gl_transaction_id=${data.gl_transaction_id}">แก้ไข</a></li>
                                <li><a class="dropdown-item" href="#" onclick="delete_data('${data.gl_transaction_id}', '${data.amount}'); return false;">ลบ</a></li>
                            </ul>
                        </div>
                    </td>`;
                html += '</tr>';
            });
        } else {
            html = noDataHtml;
        }
    } else {
        html = noDataHtml;
    }
    document.querySelector('tbody').innerHTML = html;
    $(document).ready(function () {
        $('#datatables').DataTable({
            "order": []
            // "scrollX": true
        });
    });
}

// อัพเดทข้อมูลบัญชีทั่วไป
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
    return fetch(apiUrl + 'general_ledgers/update_general_ledger.php', {
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
    const general_ledger_id = getQueryParam('general_ledger_id');

    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'general_ledger_update.php?general_ledger_id=' + general_ledger_id;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}