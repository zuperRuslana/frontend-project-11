import onChange from 'on-change';
import render from './render';

export default function init () {
const state = {
    form :{
        status: '',
        error: ''
    },
    feeds: []
};
const watchedObject = onChange(state, render);
return watchedObject;

}