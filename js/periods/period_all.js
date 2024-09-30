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
    const PeriodGroupId = getQueryParam('period_group_id');
    return fetch(apiUrl + 'periods/get_period_all.php?period_group_id=' + PeriodGroupId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function displayTables(datas) {
    let html = '';
    const noDataHtml = '<tr><td></td><td></td><td></td><td>ไม่มีข้อมูล</td><td></td><td></td></tr>';
    if (datas.status === 'success') {
        if (datas.data.length > 0) {
            datas.data.forEach(data => {
                html += '<tr>';
                html += `<td>${data.period_code}</td>
                    <td>${data.number_month}</td>
                    <td>${data.change_year}</td>
                    <td>${data.text_period_en}</td>
                    <td>${data.text_period_th}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                ตัวเลือก
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="period_detail.php?period_id=${data.period_id}">ดูข้อมูล</a></li>
                                <li><a class="dropdown-item" href="period_update.php?period_id=${data.period_id}">แก้ไข</a></li>
                                <li><a class="dropdown-item" href="#" onclick="delete_data('${data.period_id}', '${data.period_code}'); return false;">ลบ</a></li>
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

function delete_data(periodId, period_code) {
    Swal.fire({
        title: period_code,
        text: 'คุณต้องการลบใช่ไหม',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ลบ',
        cancelButtonText: 'ยกเลิก'
    }).then((result) => {
        if (result.isConfirmed) {
            getSessionToken()
                .then(mySession => fetchDelete(periodId, mySession.token))
                .then(response => handleDeleteResponse(response))
                .catch(error => handleError(error));
        }
    });
}

function fetchDelete(periodId, token) {
    return fetch(apiUrl + 'periods/delete_period.php', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ period_id: periodId })
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