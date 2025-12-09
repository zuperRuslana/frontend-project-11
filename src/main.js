import './style.css'
import { userSchema } from './validator'
import init from './application'
import './i18ninit.js';
const watchedObject = init();


const form = document.querySelector('#rss-form')
const input = document.querySelector('#rss-url')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = input.value;

  if(url.trim().length === 0)  {
    watchedObject.form.error = 'empty';
    return;
    }
  const inputObject = {url : input.value}
  userSchema.validate(inputObject) 
    .then((data) => { 
      if(watchedObject.feeds.includes(url)){
        throw new Error('duplicate');
      }
      return data;
  })
    .then((data)=> {
      watchedObject.form.status = 'sending';
      return fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(data.url)}`)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error ('network')
      }
        return response.json();
    })
    .then((json) => {
      const parser = new DOMParser();
      const content = parser.parseFromString(json.contents, "application/xml");
      const errorNode = content.querySelector('parsererror');

      if(errorNode) {
        throw new Error('parsing')
      }
      watchedObject.feeds.push(url)
      console.log("ADDING TO FEEDS:",url)
      watchedObject.form.status = 'success'
    })
    .catch((error) => {
      if(error.message === 'duplicate') {
        watchedObject.form.error = 'duplicate'
        return;
      }
      else if(error.message === 'network') {
       watchedObject.form.error = 'network'
       return;
      }
      else if (error.message === 'parsing') {
        watchedObject.form.error = 'parsing'
        return
      }
      else {
      watchedObject.form.error = 'invalid'
      return;
      }
    })      
  })

