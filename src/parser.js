import axios from 'axios';

const parser = (url) => {
return axios.get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
.then((response)=>{
    const obj = response.data;
    return obj.contents
})
.then((data) => {
    const parser = new DOMParser();
    const contents = parser.parseFromString(data, 'text/xml');
    const errorNode = contents.querySelector('parsererror');
    if(errorNode) {
        throw new Error('parsing')
      }
      const channel = contents.querySelector('channel');
      const feed = {
       title: channel.querySelector('title').textContent,
       description: channel.querySelector('description').textContent
      };

    const itemsNodeList = contents.querySelectorAll('item');
    const items = [...itemsNodeList];
     const posts = items.map(item=>({
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent
     }))
      return {
        feed,
        posts
            }
    })
}
export default parser