// เรียกฟังก์ชันทั้งหมด --------------------------------------------------

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const central_general_ledgerId = getQueryParam('central_general_ledger_id');
        const sessionToken = await getSessionToken();

        await handleGetGeneralLedgerDetail(sessionToken.token, central_general_ledgerId);

    } catch (error) {
        handleError(error);
    }
});

// เรียกข้อมูล General Ledger --------------------------------------------------

function handleGetGeneralLedgerDetail(token, central_general_ledgerId) {
    fetchDataGeneralLedger(token, central_general_ledgerId)
        .then(data => showDataGeneralLedger(data))
        .catch(error => handleError(error));
}

function fetchDataGeneralLedger(token, central_general_ledgerId) {
    return fetch(apiUrl + 'general_ledgers/get_general_ledger.php?central_general_ledger_id=' + central_general_ledgerId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showDataGeneralLedger(data) {
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

// อัพเดทข้อมูล General Ledger --------------------------------------------------

document.getElementById('general_data').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtnGeneralData');
    submitButton.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    getSessionToken()
        .then(mySession => updateGeneralLedgerData(mySession.token, jsonData))
        .then(response => handleUpdateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function updateGeneralLedgerData(token, jsonData) {
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

// แสดง response --------------------------------------------------

function handleUpdateResponse(data) {
    const CentralGeneralLedgerId = getQueryParam('central_general_ledger_id');

    if (data.status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'general_ledger.php?central_general_ledger_id=' + CentralGeneralLedgerId;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}