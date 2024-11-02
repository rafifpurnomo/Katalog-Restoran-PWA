class ZeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <div class="zeroSection" id="hero">
          <picture class="heroPicture">
            <source media="(max-width: 500px)" srcset="./images/resizeIMG/hero-image_1-small.jpg">
            <img src="./images/resizeIMG/hero-image_1-large.jpg" alt="Background Hero Image" class="heroImg">
            <div class="zeroSectionTXT">
              <h1>Menu Nusantara</h1>
              <p>Hidangan makanan khas dari berbagai daerah di Indonesia</p>
              <a href="#mainContent">
                <button class="exploreButton">Jelajahi Restoran</button>
              </a>
            </div>
          </picture>
        </div>
      </section>
    `;
  }
}

customElements.define('zero-section', ZeroSection);
