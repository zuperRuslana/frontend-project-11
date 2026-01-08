import parser from './parser.js'
import _ from 'lodash'

export default function getPosts(url, feedId, watchedObject) {
  setTimeout(() => {
    parser(url)
      .then((data) => {
        const previousPosts = watchedObject.posts.filter(
          (post) => post.feedId === feedId,
        )

        const fetchedNewPosts = data.posts

        const newPosts = _.differenceBy(fetchedNewPosts, previousPosts, 'link')
        newPosts.forEach((post) => {
          watchedObject.posts.push({
            id: _.uniqueId(),
            feedId: feedId,
            link: post.link,
            title: post.title,
            description: post.description,
            isRead: false,
          })
        })
        getPosts(url, feedId, watchedObject)
      })
      .catch((e) => {
        console.log(e)
        getPosts(url, feedId, watchedObject)
      })
  }, 5000)
}
