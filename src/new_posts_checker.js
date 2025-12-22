import parser from './parser.js';
import _ from 'lodash';
import init from './application.js'
const watchedObject = init();

export default function getPosts(url, feedId){
setTimeout(()=> {
 parser(url)
    .then((data) => {
    const previousPosts = watchedObject.posts.filter(posts => posts.feedId === feedId)
    const fetchedNewPosts = data.posts;

    const newPost = _.differenceBy(fetchedNewPosts, previousPosts, 'link');
    
    console.log("Fetched posts:", fetchedNewPosts.length);
    console.log("Previous posts:", previousPosts.length);
    console.log("New posts detected:", newPost.length);
    newPost.forEach(post =>{
        watchedObject.posts.push({
            id: _.uniqueId(),
            feedId: feedId,
            link: post.link,
            title: post.title,
            description: post.description
           })
        })
        getPosts(url,feedId)
        })
        .catch((e)=>{
            console.log(e);
            getPosts(url,feedId)

        });
    },5000)
}