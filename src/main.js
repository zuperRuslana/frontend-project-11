import './style.css'
import { userSchema } from './validator'
import init from './application'
import './i18ninit.js'
import _ from 'lodash'
import parser from './parser.js'
import getPosts from './new_posts_checker.js'
import { createPostActions } from './stateHelpers.js'
import initStaticTranslations from './initStaticTranslations.js'

setTimeout(() => {
  initStaticTranslations()
}, 100)
const watchedObject = init()
export const postActions = createPostActions(watchedObject)

const form = document.querySelector('#rss-form')
const input = document.querySelector('#rss-url')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = input.value

  if (url.trim().length === 0) {
    watchedObject.form.error = 'empty'
    return
  }
  const inputObject = { url: input.value }
  userSchema
    .validate(inputObject)
    .then(() => {
      if (watchedObject.feeds.some(feed => feed.link === url)) {
        throw new Error('duplicate')
      }
    })
    .then(() => {
      watchedObject.form.status = 'sending'
      return parser(url)
    })
    .then((response) => {
      const { feed, posts } = response
      const feedResource = {
        id: _.uniqueId(),
        link: url,
        title: feed.title,
        description: feed.description,
      }
      const postsResource = posts.map((post) => {
        return {
          id: _.uniqueId(),
          feedId: feedResource.id,
          link: post.link,
          title: post.title,
          description: post.description,
        }
      })
      watchedObject.feeds.push(feedResource)
      postsResource.forEach(post => watchedObject.posts.push(post))
      watchedObject.form.status = 'success'
      getPosts(url, feedResource.id, watchedObject)
    })
    .catch((error) => {
      if (error.message === 'duplicate') {
        watchedObject.form.error = 'duplicate'
        return
      }
      else if (error.message === 'network') {
        watchedObject.form.error = 'network'
        return
      }
      else if (error.message === 'parsing') {
        watchedObject.form.error = 'parsing'
        return
      }
      else {
        watchedObject.form.error = 'invalid'
        return
      }
    })
})
