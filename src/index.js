import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQkLK8z25fJtBdMkbPLGzrstSzGdoBJt0",
  authDomain: "coffee-clicker-react.firebaseapp.com",
  projectId: "coffee-clicker-react",
  storageBucket: "coffee-clicker-react.appspot.com",
  messagingSenderId: "253528429226",
  appId: "1:253528429226:web:603e9bc1839e033ce676d3",
  measurementId: "G-63Y8X42ZM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
