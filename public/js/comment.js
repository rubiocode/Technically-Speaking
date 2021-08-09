const commentFormHandler = async (event) => {
    event.preventDefault();


    // Grab HTML elements and store them in variables
    const commentEl = $('textarea[name"comment-body"]').val().trim();
    const postEl = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    //fetching api route
    if (commentEl) {

        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                commentEl,
                postEl,
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }

    }


}

//event listeners
$('.comment-form').on('submit', commentFormHandler);