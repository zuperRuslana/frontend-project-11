import parser from "./parser.js";
import _ from "lodash";
import init from "./application.js";
const watchedObject = init();

export default function getPosts(url, feedId) {
  setTimeout(() => {
    parser(url)
      .then((data) => {
        const previousPosts = watchedObject.posts.filter(
          (post) => post.feedId === feedId,
        );
        const fetchedNewPosts = data.posts;

        const newPosts = _.differenceBy(fetchedNewPosts, previousPosts, "link");
        newPosts.forEach((post) => {
          watchedObject.posts.push({
            id: _.uniqueId(),
            feedId: feedId,
            link: post.link,
            title: post.title,
            description: post.description,
            isRead: false,
          });
        });
        getPosts(url, feedId);
      })
      .catch((e) => {
        console.log(e);
        getPosts(url, feedId);
      });
  }, 5000);
}
