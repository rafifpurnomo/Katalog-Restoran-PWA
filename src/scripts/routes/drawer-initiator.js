const DrawerInitiator = {
  init({ button, drawer, content, hero }) {
    button.addEventListener("click", (event) => {
      this._ToogleDrawer(event, drawer);
    });

    content.addEventListener("click", (event) => {
      this._closeDrawer(event, drawer);
    });

    hero.addEventListener("click", (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _ToogleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle("open");
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove("open");
  },
};

export default DrawerInitiator;
