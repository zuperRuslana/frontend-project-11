export default function render (path, value, state) {
    const input = document.querySelector('#rss-url');
    const feedback = document.querySelector('.invalid-feedback');

    if (path === 'form.error') {
        if(value === 'empty'){
        feedback.textContent = 'Please fill out this field';
        input.classList.add('is-invalid')

    }
        if (value === 'duplicate'){
        feedback.textContent = 'This url already existst. Enter different url.'
        input.classList.add('is-invalid')
    }
        if (value === 'invalid') {
        feedback.textContent = 'Enter a valid Url.'
        input.classList.add('is-invalid')
    }
}

    if (path === 'form.status') {
        if(value === 'success') {
        input.value = '';
        feedback.textContent = '';
        input.classList.remove('is-invalid')
        input.focus()
        }
    }
}