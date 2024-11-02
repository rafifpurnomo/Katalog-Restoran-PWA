import 'regenerator-runtime';

import '../styles/main.css';
import '../styles/main.responsive.css';
import '../styles/detailResto.css';
import '../styles/detailResto.Responsive.css';
import '../styles/favResto.css';
import '../styles/searchBar.css';
import '../styles/loading.css';

import './view/navbar';
import './view/zerosection';
import './view/searchBar';
import './view/detailResto';
import './view/displayFavorites';
import './view/loading';

import swRegist from './config/sw';
import App from './app';

swRegist();
const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#navbar'),
  content: document.querySelector('#mainContent'),
  hero: document.querySelector('#hero'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

