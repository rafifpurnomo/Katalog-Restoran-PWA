import DrawerInitiator from "./routes/drawer-initiator";
import routes from "./routes/routes";
import UrlParser from "./routes/urlParser";

class App {
  constructor({ button, drawer, content, hero }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._hero = hero;
    this._initialAppshell();
  }

  _initialAppshell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
      hero: this._hero,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    
    console.log("Parsed URL:", url); // Log the parsed URL
    console.log("Available routes:", Object.keys(routes)); // Check available routes
  }
}

export default App;
