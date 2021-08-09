const newFormHandler = async (event) => {
    event.preventDefault();


    // Grab HTML elements and store them in variables
    const titleEl = $('input[name"post-title"]').val();
    const postEl = $('input[name"post-content"]').val();

    //fetching api route
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            titleEl,
            postEl,
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

//event listeners
$('.new-post-form').on('submit', newFormHandler);