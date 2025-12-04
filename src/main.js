import './style.css'

const form = document.querySelector('#rss-form')
const input = document.querySelector('#rss-url')
const feedback = document.querySelector('.invalid-feedback')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(input.value.trim().length === 0){
  feedback.textContent = 'Please fill out this field';
  return
  }
  else {
    getData();
  }
})
  
   function getData () {
    const promise = fetch('https://api.example.com/data');
      
    promise
      .then(response => {
        if(!response.ok){
          throw new Error (`'HTTP error! status: ${response.status}`)
        }
        return response.text();
      })
      .then((data) => {
        console.log('Success!')
      })
      .catch((error) => {
        console.log(" Error:", error)
    })
  }


