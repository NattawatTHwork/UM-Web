document.addEventListener("DOMContentLoaded", async function () {
    try {
        const sessionToken = await getSessionToken();
        const data = await fetchData(sessionToken.token);
        showData(data);
    } catch (error) {
        handleError(error);
    }
});

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
    if (data.status === 'success') {
        const user = data.data;

        document.getElementById('username').value = user.username;
        document.getElementById('firstname').value = user.firstname;
        document.getElementById('lastname').value = user.lastname;
        document.getElementById('role').value = user.role;
        document.getElementById('statusflag').value = user.statusflag === 't' ? 'เปิดใช้งาน' : 'ปิดใช้งาน';
    } else {
        handleError(data.message);
    }
}