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
    return fetch(apiUrl + 'fiscal_years/get_fiscal_year_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function displayTables(datas) {
    let html = '';
    const noDataHtml = '<tr><td></td><td></td><td></td><td>ไม่มีข้อมูล</td><td></td><td></td><td></td></tr>';
    if (datas.status === 'success') {
        if (datas.data.length > 0) {
            datas.data.forEach(data => {
                html += '<tr>';
                html += `<td>${data.fiscal_year_code}</td>
                    <td>${data.description}</td>
                    <td><input type="checkbox" ${data.fiscal_year_check === 't' ? 'checked' : ''} disabled></td>
                    <td><input type="checkbox" ${data.calendar_year_check === 't' ? 'checked' : ''} disabled></td>
                    <td>${data.posting_period_count}</td>
                    <td>${data.special_period_count}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ตัวเลือก
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="fiscal_year_detail.php?fiscal_year_id=${data.fiscal_year_id}">ดูข้อมูล</a></li>
                                <li><a class="dropdown-item" href="fiscal_year_update.php?fiscal_year_id=${data.fiscal_year_id}">แก้ไข</a></li>
                                <li><a class="dropdown-item" href="#" onclick="delete_data('${data.fiscal_year_id}', '${data.fiscal_year_code}'); return false;">ลบ</a></li>
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

function delete_data(fiscal_yearId, fiscal_year_code) {
    Swal.fire({
        title: fiscal_year_code,
        text: 'คุณต้องการลบใช่ไหม',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            getSessionToken()
                .then(mySession => fetchDelete(fiscal_yearId, mySession.token))
                .then(response => handleDeleteResponse(response))
                .catch(error => handleError(error));
        }
    });
}

function fetchDelete(fiscal_yearId, token) {
    return fetch(apiUrl + 'fiscal_years/delete_fiscal_year.php', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fiscal_year_id: fiscal_yearId })
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