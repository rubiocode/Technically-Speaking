
///////////  DELETE AND EDIT POST JS FUNCTIONS NOT WORKING PROPERLY////////////////////////////////////

/*async function editFormHandler(event) {
    event.preventDefault();

    const comment_content = document.querySelector('textarea[name="comment-body"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#update').addEventListener('click', editFormHandler);*/