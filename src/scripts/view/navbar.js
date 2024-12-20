import  displayFavorites  from './displayFavorites';
import { displayRestoran } from './displayResto';
class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar" id="navbar">
        <a href="/" class="logo">
          <h1>Mensa</h1>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu">
          <span class="line1"></span>
          <span class="line2"></span>
          <span class="line3"></span>
        </button>
        <ul class="nav-ul" id="nav-menu">
      <li class="nav-li"><a href="/" class="nav-a">Home</a></li>
      <li class="nav-li"><a href="/favorites" id="favoriteLink" class="nav-a">Favorite</a></li>
      <li class="nav-li"><a href="https://www.instagram.com/mrffap/" class="nav-a">About Us</a></li>
    </ul>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-ul');

document.getElementById('favoriteLink').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.hash = '/favorite';
});


hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', !isExpanded);
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

const navLink = document.querySelectorAll('.nav-a');

navLink.forEach((n) => n.addEventListener('click', closeMenu));

function closeMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}

document.addEventListener('click', (event) => {
  const isClickInsideNav =
    navMenu.contains(event.target) || hamburger.contains(event.target);
  if (!isClickInsideNav && navMenu.classList.contains('active')) {
    closeMenu();
  }
});


