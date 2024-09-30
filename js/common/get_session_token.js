function getSessionToken() {
    return fetch(pathUrl + 'php/session/get_session_token.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(mySession => {
            return mySession;
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            throw error; // rethrow the error so it can be handled by the caller
        });
}