const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // send to '/' homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

//event listeners
$('#logout').on('click', logout);