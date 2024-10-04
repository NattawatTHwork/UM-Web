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
        .then(loginData => {
            // Now pass the loginData along with the token
            return handleFetchmenus(loginData.token).then(menuData => ({
                loginData, // Store the login data to pass forward
                token: loginData.token, 
                menuData
            }));
        })
        .then(({ loginData, token, menuData }) => handleFetchResponse(token, menuData, loginData)) // Pass loginData too
        .then(data => handleSessionResponse(data)) // Now handleSessionResponse will receive the loginData along with menuData
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
        .then(menuData => menuData); // Return only menuData
}

function handleFetchResponse(token, menuData, loginData) { // Added loginData here
    if (menuData.status === 'success') {
        const payloadBase64 = token.split('.')[1];
        const data_token = JSON.parse(atob(payloadBase64));

        const postData = {
            token,
            ...data_token,
            allowed_menu: menuData.data
        };

        return fetch(pathUrl + 'php/session/set_session_token.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(response => response.json())
        .then(sessionResponse => ({
            ...sessionResponse,
            loginData, // Include the original loginData in the response
            menuData // Also include the menuData
        })); // Include both session response and loginData
    } else {
        return handleErrorByMenuStatus(loginData);
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

function handleErrorByMenuStatus(loginData) {
    if (loginData.status === 'exist') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่พบชื่อผู้ใช้'
        });
        return Promise.reject('Username does not exist');
    } else if (loginData.status === 'deactivated') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'บัญชีถูกยกเลิก'
        });
        return Promise.reject('Account is deactivated');
    } else if (loginData.status === 'inactive') {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'บัญชีถูกปิดใช้งาน'
        });
        return Promise.reject('Account is inactive');
    } else if (loginData.status === 'incorrect') {
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
