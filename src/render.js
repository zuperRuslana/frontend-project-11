import i18next from 'i18next'
import { postActions } from './main'
let clickedPost = null

export default function render(path, value, state) {
  const input = document.querySelector('#rss-url')
  const feedback = document.querySelector('.feedback')
  const feedsSection = document.querySelector('#feeds')
  const postsSection = document.querySelector('#posts')

  if (path === 'form.error') {
    feedback.textContent = i18next.t(`error.${value}`)
    feedback.className
      = 'feedback m-0 position-absolute small text-danger'
    input.classList.add('is-invalid')
    input.classList.add('is-invalid')
    i18next.t('error.invalid')
    input.classList.remove('border-success')
  }
  if (path === 'form.status' && value === 'sending') {
    feedback.textContent = i18next.t('status.sending')
    feedback.className
      = 'feedback m-0 position-absolute small text-secondary'
    input.classList.remove('is-invalid')
  }
  if (path === 'form.status' && value === 'success') {
    feedback.textContent = i18next.t('status.success')
    feedback.className
      = 'feedback m-0 position-absolute small text-success'
    input.classList.remove('is-invalid')
    input.classList.add('border', 'border-3', 'border-success')
    input.value = ''
    input.focus()
  }

  if (path === 'feeds') {
    feedsSection.innerHTML = ''
    const header = document.createElement('div')
    header.className = 'card-title h4 pb-2'
    header.textContent = i18next.t('page.feeds')
    feedsSection.appendChild(header)
    const feedsList = document.createElement('ul')
    feedsList.className = 'list-group border 0 rounded 0'
    feedsSection.appendChild(feedsList)

    state.feeds.forEach((obj) => {
      const li = document.createElement('li')
      li.className = 'list-group-item border-0 border-end-0'
      const h3 = document.createElement('h3')
      h3.className = 'h6 m0'
      h3.textContent = obj.title
      const feedsDescription = document.createElement('p')
      feedsDescription.className = 'm-0 small text-black-50'
      feedsDescription.textContent = obj.description
      feedsList.appendChild(li)
      li.appendChild(h3)
      li.appendChild(feedsDescription)
    })
  }

  if (path.startsWith('posts') || path.startsWith('ui')) {
    postsSection.innerHTML = ''
    const h4 = document.createElement('div')
    h4.className = 'card-title h4 pb-2'
    h4.textContent = i18next.t('page.posts')
    postsSection.appendChild(h4)
    const postsList = document.createElement('ul')
    postsList.className = 'list-group border 0 rounded 0'
    postsSection.appendChild(postsList)

    state.posts.forEach((post) => {
      const li = document.createElement('li')
      li.className
        = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0'
      const a = document.createElement('a')
      const isRead = state.ui.readPostsIds.includes(post.id)
      a.classList.add(isRead ? 'fw-normal' : 'fw-bold')
      postsList.appendChild(li)
      li.appendChild(a)
      a.href = post.link
      a.textContent = post.title
      a.dataset.postId = post.id
      a.target = '_blank'
      a.rel = 'noopener noreferrer'

      a.addEventListener('click', (e) => {
        const { postId } = e.currentTarget.dataset
        postActions.readPost(postId)
      })

      const button = document.createElement('button')
      button.className = 'btn btn-success btn-sm'
      button.textContent = i18next.t('buttons.read')
      a.after(button)
      button.setAttribute('data-bs-toggle', 'modal')
      button.setAttribute('data-bs-target', '#modal')
      button.dataset.postId = post.id

      button.addEventListener('click', (e) => {
        const { postId } = e.currentTarget.dataset
        clickedPost = post
        postActions.readPost(postId)
      })
    })
  }
}

const modal = document.getElementById('modal')
const readingBtn = document.getElementById('reading')
readingBtn.textContent = i18next.t('buttons.read')

modal.addEventListener('shown.bs.modal', () => {
  if (!clickedPost) return
  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const closeBtn = document.getElementById('closeBtn')
  closeBtn.textContent = i18next.t('buttons.close')
  const readFullBtn = document.getElementById('reading')
  readFullBtn.textContent = i18next.t('buttons.continue')
  title.textContent = clickedPost.title
  description.textContent = clickedPost.description
  readingBtn.href = clickedPost.link
})
