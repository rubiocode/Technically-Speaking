const deleteFormHandler = async (event) => {
    event.preventDefault();


    // Grab HTML elements and store them in variables
    const idEl = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    //fetching api route
    const response = await fetch(`/api/posts/${idEl}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id,
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
$('.delete-post-button').on('click', deleteFormHandler);