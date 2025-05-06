// Function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Get the csrf_token from cookies
const csrfToken = getCookie('csrf_token');

if (!csrfToken) {
    alert('CSRF token not found in cookies!');
} else {
    // Make the fetch request
    fetch("https://www.reddit.com/svc/shreddit/token", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:137.0) Gecko/20100101 Firefox/137.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Priority": "u=4",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "referrer": "https://www.reddit.com/",
        "body": JSON.stringify({"csrf_token": csrfToken}),
        "method": "POST",
        "mode": "cors"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        alert(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}
