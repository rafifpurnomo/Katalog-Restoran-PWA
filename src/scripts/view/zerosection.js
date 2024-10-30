class ZeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     <section>
        <div class="zeroSection" id="hero">
            <div class="zeroSectionTXT">
                <h1>Menu Nusantara</h1>
                <p>hidangan makanan khas dari berbagai daerah di indonesia</p>
            </div>
            <a href="#judul">
                <button>jelajahi restoran</button>
            </a>
        </div>
    </section>
      `;
  }
}
customElements.define("zero-section", ZeroSection);

