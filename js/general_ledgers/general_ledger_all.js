document.addEventListener("DOMContentLoaded", async function () {
    handleGetAll();
});

function handleGetAll(event) {
    if (event) {
        event.preventDefault();
    }

    getSessionToken()
        .then(mySession => fetchData(mySession.token))
        .then(data => displayTables(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    return fetch(apiUrl + 'general_ledgers/get_general_ledger_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function displayTables(datas) {
    let html = '';
    const noDataHtml = '<tr><td></td><td></td><td>ไม่มีข้อมูล</td><td></td><td></td></tr>';
    if (datas.status === 'success') {
        if (datas.data.length > 0) {
            datas.data.forEach(data => {
                html += '<tr>';
                html += `<td>${data.company_code}</td>
                    <td>${data.document_date}</td>
                    <td>${data.posting_date ?? 'ยังไม่ได้ระบุ'}</td>
                    <td>${data.document_type}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ตัวเลือก
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="general_ledger_update.php?general_ledger_id=${data.general_ledger_id}">แก้ไขและเพิ่มรายการบัญชีประเภททั่วไป</a></li>
                                <li><a class="dropdown-item" href="#" onclick="delete_data('${data.general_ledger_id}', '${data.document_date}'); return false;">ลบ</a></li>
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

function delete_data(general_ledgerId, gl_account) {
    Swal.fire({
        title: gl_account,
        text: 'คุณต้องการลบใช่ไหม',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            getSessionToken()
                .then(mySession => fetchDelete(general_ledgerId, mySession.token))
                .then(response => handleDeleteResponse(response))
                .catch(error => handleError(error));
        }
    });
}

function fetchDelete(general_ledgerId, token) {
    return fetch(apiUrl + 'general_ledgers/delete_general_ledger.php', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ general_ledger_id: general_ledgerId })
    })
    .then(response => response.json());
}

function handleDeleteResponse(response) {
    if (response.status === 'success') {
        Swal.fire({
            title: 'สำเร็จ',
            icon: 'success'
        }).then(() => {
            location.reload();
        });
    } else {
        Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            icon: 'error'
        });
    }
}