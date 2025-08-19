const formDataToJSON = (formData) => {
    if (!(formData instanceof FormData)) {
        throw TypeError('formData argument is not an instance of FormData');
    }

    const data = {}
    for (const [name, value] of formData) {
        data[name] = value;
    }

    return JSON.stringify(data);
}

document.querySelector('.login-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);
    const data = formDataToJSON(formData);

    await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data,
    }, response => response.json());

    /*try {
        const response = await fetch('/admin');

        if (response.status === 200) {
            window.location.href = '/admin';
        }

    } catch (error) {
        console.error('Failed to load into admin page:', error);
    }*/
});


