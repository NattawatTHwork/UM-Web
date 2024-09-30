document.getElementById('lang-th').addEventListener('click', function() {
    setLanguage('th');
});

document.getElementById('lang-en').addEventListener('click', function() {
    setLanguage('en');
});

function setLanguage(language) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('language', language);
    window.location.href = currentUrl.toString();
}