document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();

        await Promise.all([
            handleGetMenuAll(sessionToken.token),
        ]);

        await handleGetDetail(sessionToken.token);
    } catch (error) {
        handleError(error);
    }
});

function handleGetMenuAll(token) {
    return fetchMenuAll(token)
        .then(data => populateMenuAllCheckbox(data))
        .catch(error => handleError(error));
}

function fetchMenuAll(token) {
    return fetch(apiUrl + 'menus/get_menu_all.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function populateMenuAllCheckbox(data) {
    if (data.status === 'success') {
        const checkboxContainer = document.getElementById('checkboxContainer');
        checkboxContainer.innerHTML = '';

        data.data.forEach(function (menu) {
            const div = document.createElement('div');
            div.classList.add('form-check');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.id = 'menu_' + menu.menu_id;
            checkbox.name = 'menu[]';
            checkbox.value = menu.menu_id;

            const label = document.createElement('label');
            label.classList.add('form-check-label');
            label.htmlFor = 'menu_' + menu.menu_id;
            label.textContent = menu.menu_th;

            div.appendChild(checkbox);
            div.appendChild(label);
            checkboxContainer.appendChild(div);
        });
    } else {
        handleError(data.message);
    }
}

function handleGetDetail(token) {
    fetchData(token)
        .then(data => showData(data))
        .catch(error => handleError(error));
}

function fetchData(token) {
    const role_id = getQueryParam('role_id');
    return fetch(apiUrl + 'role_menus/get_role_menu.php?role_id=' + role_id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json());
}

function showData(data) {
    if (data.status === 'success') {
        const permittedMenus = data.data.map(menu => menu.menu_id);

        permittedMenus.forEach(menu_id => {
            const checkbox = document.getElementById('menu_' + menu_id);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    } else {
        handleError(data.message);
    }
}

document.getElementById('InputForm').addEventListener('submit', function handleFormSubmit(event) {
    event.preventDefault();

    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const formData = new FormData(event.target);

    formData.delete('menu[]');

    const menuCheckboxes = document.querySelectorAll('input[name="menu[]"]:checked');
    const menu_id = Array.from(menuCheckboxes).map(checkbox => checkbox.value);

    const jsonData = convertFormDataToJson(formData);
    
    jsonData.menu_id = menu_id;

    getSessionToken()
        .then(mySession => createData(mySession.token, jsonData))
        .then(response => handleCreateResponse(response))
        .catch(error => handleError(error))
        .finally(() => {
            submitButton.disabled = false;
        });
});

function createData(token, jsonData) {
    return fetch(apiUrl + 'role_menus/manage_role_menu.php', {
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
    if (data.status === 'success') {
        const role_id = getQueryParam('role_id');
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
        })
            .then(() => {
                window.location.href = 'manage_role_menu.php?role_id=' + role_id;
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
        });
    }
}
