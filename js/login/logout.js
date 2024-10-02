function logout() {
    fetch(pathUrl + 'php/session/clear_session_token.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log('Session token cleared successfully.');
                window.location.href = '/UM-Web/login.php';
            } else {
                console.error('Error clearing session token:', data.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}
