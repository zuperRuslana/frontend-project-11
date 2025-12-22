import i18next from 'i18next';

export default function render (path, value, state) {
    const input = document.querySelector('#rss-url');
    const feedback = document.querySelector('.feedback');
    const feedsSection = document.querySelector('#feeds')
    const postsSection = document.querySelector('#posts')
    //console.log('render:', path, value)


    if (path === 'form.error') {
        feedback.textContent = i18next.t(`error.${value}`);
        input.classList.add('is-invalid')
        i18next.t('error.invalid')
        }

    if (path === 'form.status') {
        input.value = '';
        feedback.textContent = i18next.t(`status.${value}`);
        input.classList.remove('is-invalid')
        input.classList.add('border-success')
        input.focus()
        }

    if (path === 'feeds') {
        feedsSection.innerHTML = '';
        const header = document.createElement('div');
        header.className = 'card-title h4 pb-2'
        header.textContent = 'Feeds:';
        feedsSection.appendChild(header);
        const feedsList = document.createElement('ul');
        feedsList.className = 'list-group border 0 rounded 0'
        feedsSection.appendChild(feedsList);

        state.feeds.forEach( obj => {
            const li = document.createElement('li');
            li.className ='list-group-item border-0 border-end-0'
            const h3 = document.createElement('h3')
            h3.className = 'h6 m0';
            h3.textContent = obj.title
            const feedsDescription = document.createElement('p')
            feedsDescription.className = 'm-0 small text-black-50';
            feedsDescription.textContent = obj.description;
            feedsList.appendChild(li)
            li.appendChild(h3)
            li.appendChild(feedsDescription)
        })
    }

    if (path === 'posts') {
        postsSection.innerHTML = '';
        const h4 = document.createElement('div');
        h4.className = 'card-title h4 pb-2'
        h4.textContent = 'Posts:';
        postsSection.appendChild(h4);
        const postsList = document.createElement('ul');
        postsList.className = 'list-group border 0 rounded 0'
        postsSection.appendChild(postsList);

        state.posts.forEach(post => {
            const li = document.createElement('li');
            li.className= "list-group-item d-flex justify-content-between align-items-start border-0 border-end-0"
            const a = document.createElement('a');
            a.className = "fw-bold"
            postsList.appendChild(li)
            li.appendChild(a)
            a.href = post.link
            a.textContent = post.title
        })
    }
}