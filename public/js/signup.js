const signupFormHandler= async (event)=>{
    event.preventDefault();

    //grab HTML elements and store them in variables
    const emailEl = $('#email-signup').val().trim();
    const githubEl = $('#github-signup').val().trim();
    const passwordEl = $('#password-signup').val().trim();
    const twitterEl = $('#twitter-signup').val().trim();
    const usernameEl = $('#username-signup').val().trim();


//Fetch POST request 
    if (emailEl && passwordEl && usernameEl) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                emailEl,
                githubEl,
                passwordEl,
                twitterEl,
                usernameEl,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok){
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText);
        }
    }
};


//event listener
$('.signup-form').on('submit', signupFormHandler);