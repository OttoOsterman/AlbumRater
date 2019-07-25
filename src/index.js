import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBOJfdnvNDCQhguweHAO31ZhYviQ-tVLpM",
    authDomain: "albumrater-da4e8.firebaseapp.com",
    databaseURL: "https://albumrater-da4e8.firebaseio.com",
    projectId: "albumrater-da4e8",
    storageBucket: "albumrater-da4e8.appspot.com",
    messagingSenderId: "138571837938",
    appId: "1:138571837938:web:f7c39291f396c8e4"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
