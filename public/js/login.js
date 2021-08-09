const loginFormHandler = async (event) => {
    event.preventDefault();


    // Grab HTML elements and store them in variables
    const emailEl = $('#email-login').val().trim();
    const passwordEl = $('#password-login').val().trim();

    //fetching api route
    if(emailEl && passwordEl){
    const response = await fetch(`/api/users/login`, {
        method: 'POST',
        body: JSON.stringify({
            emailEl,
            passwordEl,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    }
}

//event listeners
$('.login-form').on('submit', loginFormHandler);