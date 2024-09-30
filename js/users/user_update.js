document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        await handleGetRoles(sessionToken.token);
        const data = await fetchData(sessionToken.token);
        showData(data);
    } catch (error) {
        handleError(error);
    }
});

async function handleGetRoles(token) {
    try {
        const data = await fetchRoles(token);
        populateRoleOptions(data);
    } catch (error) {
        handleError(error);
    }
}

function fetchRoles(token) {
    return fetch(apiUrl + 'roles/get_role_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateRoleOptions(data) {
    const roleSelect = document.getElementById('role_id');
    if (data.status === 'success') {
        data.data.forEach(role => {
            const option = document.createElement('option');
            option.value = role.role_id;
            option.textContent = role.role;
            roleSelect.appendChild(option);
        });
    } else {
        handleError(data.message);
    }
}

function fetchData(token) {
    const userId = getQueryParam('user_id');
    return fetch(apiUrl + 'users/get_user.php?user_id=' + userId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json());
}

function showData(data) {
    console.log(data)
    if (data.status === 'success') {
        const user = data.data;

        document.getElementById('user_id').value = user.user_id;
        document.getElementById('firstname').value = user.firstname;
        document.getElementById('lastname').value = user.lastname;
        document.getElementById('role_id').value = user.role_id;
        document.getElementById('statusflag').value = user.statusflag;
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
    return fetch(apiUrl + 'users/update_user.php', {
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