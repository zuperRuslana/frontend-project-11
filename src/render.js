import i18next from 'i18next';

export default function render (path, value, state) {
    const input = document.querySelector('#rss-url');
    const feedback = document.querySelector('.invalid-feedback');
    console.log('render:', path, value)


    if (path === 'form.error') {
        feedback.textContent = i18next.t(`error.${value}`);
        input.classList.add('is-invalid')
        i18next.t('error.invalid')

        }

    if (path === 'form.status') {
        input.value = '';
        feedback.textContent = i18next.t(`status.${value}`);
        input.classList.remove('is-invalid')
        input.focus()
    }
}