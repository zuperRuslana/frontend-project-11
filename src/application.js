import onChange from 'on-change';
import render from './render';

export default function init () {
const state = {
    form :{
        status: '',
        error: '',
    },
    feeds: [],
    posts: [],
    ui : {
        readPostsIds: []
    }
};
const watchedObject = onChange(state, (path, value)=> {
    render(path, value, state)
})
return watchedObject;

}