document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(event) {
    event.preventDefault();
    const buttonLogin = document.getElementById('button_login');
    buttonLogin.disabled = true;

    const formData = new FormData(event.target);
    const jsonData = convertFormDataToJson(formData);

    fetchData(jsonData)
        .then(data => handleFetchmenus(data.token))
        .then(({ token, data }) => handleFetchResponse(token, data)) // Pass both token and menu data
        .then(data => handleSessionResponse(data))
        .catch(error => handleError(error))
        .finally(() => {
            buttonLogin.disabled = false;
        });
}

function fetchData(jsonData) {
    return fetch(apiUrl + 'users/user_login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json());
}

function handleFetchmenus(token) {
    return fetch(apiUrl + 'role_menus/get_role_menu_token.php', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => ({ token, data })); // Fixed return statement
}

function handleFetchResponse(token, data) { // Accept token and menuData as parameters
    if (data.status === 'success') {
        const payloadBase64 = token.split('.')[1];
        const data_token = JSON.parse(atob(payloadBase64));

        const postData = {
            token,
            ...data_token,
            allowed_menu: data.data
        };

        return fetch(pathUrl + 'php/session/set_session_token.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then(response => response.json());
    } else if (menuData.status === 'exist') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่พบชื่อผู้ใช้'
        });
        return Promise.reject('Username does not exist');
    } else if (menuData.status === 'deactivated') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'บัญชีถูกยกเลิก'
        });
        return Promise.reject('Account is deactivated');
    } else if (menuData.status === 'inactive') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'บัญชีถูกปิดใช้งาน'
        });
        return Promise.reject('Account is inactive');
    } else if (menuData.status === 'incorrect') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'รหัสผ่านไม่ถูกต้อง'
        });
        return Promise.reject('Incorrect password');
    } else {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'
        });
        return Promise.reject('Unknown error');
    }
}

function handleSessionResponse(data) {
    if (data.status === 'session_set') {
        Swal.fire({
            position: "center",
            icon: "success",
            title: 'สำเร็จ',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = 'index.php';
        });
    } else {
        console.error('Session could not be set:', data.message);
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'Session could not be set.'
        });
    }
}
