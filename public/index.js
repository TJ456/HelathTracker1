import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';
// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.innerText = 'Toggle Theme';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '20px';
themeToggle.style.right = '20px';
themeToggle.style.padding = '10px 20px';
themeToggle.style.backgroundColor = '#4CAF50';
themeToggle.style.color = 'white';
themeToggle.style.border = 'none';
themeToggle.style.borderRadius = '5px';
themeToggle.style.cursor = 'pointer';

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

document.body.appendChild(themeToggle);

// Preload Assets
window.addEventListener('load', () => {
  console.log('All assets are loaded!');
  // You can add more preloading logic here
});
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);