import './style.css'
import { userSchema } from './validator'
import init from './application'
const watchedObject = init();


const form = document.querySelector('#rss-form')
const input = document.querySelector('#rss-url')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(input.value.trim().length === 0)  {
    watchedObject.form.error = 'empty';
    return;
    }
  const inputObject = {url : input.value}
  userSchema.validate(inputObject) 
    .then((data) => { 
      if(watchedObject.feeds.includes(data.url)){
        throw new Error('duplicate');
      }
      return data;
  })
    .then((data)=> {
      watchedObject.form.status = 'sending';
      return fetch(data.url)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error ('network')
      }
      return response.text();
    })
    .then((data) => {
      watchedObject.form.status = 'success'
      watchedObject.feeds.push(input.value)
    })
    .catch((error)=> {
      if(error.message === 'duplicate') {
        watchedObject.form.error = 'duplicate'
        return;
      }
      if(error.message === 'network') {
       watchedObject.form.error = 'network'
       return;
      }
      else {
      watchedObject.form.error = 'invalid'
      return;
      }
    })      
  })

