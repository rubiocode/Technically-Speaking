const editFormHandler = async (event) => {
    event.preventDefault();


    // Grab HTML elements and store them in variables
    const titleEl=$('input[name="post-title"]').val();
    const postEl=$('input[name="post-content"]').val();
    const idEl= window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    //fetching api route
    const response = await fetch(`/api/posts/${idEl}`, {
        method: 'PUT',
        body: JSON.stringify({
            titleEl,
            postEl,
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }

}

//event listeners
$('.edit-post-form').on('submit', editFormHandler);