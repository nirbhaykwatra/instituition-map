const content = document.querySelector('.admin-content');

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


window.addEventListener('load', () => {
    loadPage('/institutions');
})

document.addEventListener('click', (e) => {
    const { target } = e;
    e.preventDefault();
    
    if (target.matches('.admin-sidebar-item')) {
        console.log(target.href);
        
        loadPage(target.href);
    }
    
    if (target.matches('.institutions-content-add-body-input-button')) {
        submitInstitutionData();
    }
    
});

async function loadPage(url) {
    const html = await fetch(url).then(response => response.text());
    content.innerHTML = html.toString();
}

async function submitInstitutionData(){
    const form = document.querySelector('.institutions-content-add-body-input-form');
    const formData = new FormData(form);
    const data = formDataToJSON(formData);
    const data_parsed = JSON.parse(data);
    
    if (data_parsed.institutionType === "industry") {
        form.action = '/api/industry';
    } 
    else if (data_parsed.institutionType === "postsec") {
        form.action = '/api/postsec';
    }
    else if (data_parsed.institutionType === "school") {
        form.action = '/api/schools';
    }
    
    form.submit();
}


