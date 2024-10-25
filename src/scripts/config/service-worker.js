if (!self.define) {
  let e,
    s = {};
  const i = (i, c) => (
    (i = new URL(i + ".js", c).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, a) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let d = {};
    const n = (e) => i(e, r),
      o = { module: { uri: r }, exports: d, require: n };
    s[r] = Promise.all(c.map((e) => o[e] || n(e))).then((e) => (a(...e), d));
  };
}
define(["./workbox-3ca83693"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "public/data/DATA.json",
          revision: "0760fae8cf2d2b172678847987d1d95c",
        },
        {
          url: "public/images/heros/hero-image_1.jpg",
          revision: "a2f444d9e2e43a5d0373b1a0d8cb2236",
        },
        {
          url: "public/images/heros/hero-image_2.jpg",
          revision: "49f78cae81de4f48caf1c2fe0271c828",
        },
        {
          url: "public/images/heros/hero-image_3.jpg",
          revision: "d232e05589056e05f52cf2689f315c6c",
        },
        {
          url: "public/images/heros/hero-image_4.jpg",
          revision: "4ea98fe648a0b853ab379c928b5fd0bf",
        },
        {
          url: "public/images/icon/mensaIcon.png",
          revision: "97bfa7753b60bfb9b7c4fba859c71045",
        },
        {
          url: "public/manifest.json",
          revision: "5725c862ca607d828230f8d2a09c950f",
        },
        {
          url: "scripts/API/api.js",
          revision: "d76e87a513c8e9e8fc9ddc69c4dc4c17",
        },
        {
          url: "scripts/config/indexDB.config.js",
          revision: "c96f3c93eff38b1d266fa4c2ec28f2f8",
        },
        {
          url: "scripts/config/sw.js",
          revision: "5207cac701f6a2adca56a5e48c5b4b67",
        },
        {
          url: "scripts/index.js",
          revision: "a9b087dfff570aaa9ab9d1c5d29c5679",
        },
        {
          url: "scripts/view/detailResto.js",
          revision: "8dbb405f15a7c1499d1b3ead598b6de2",
        },
        {
          url: "scripts/view/displayFavorites.js",
          revision: "3a4bfb02666f0c098bb4a1fcbbe38d71",
        },
        {
          url: "scripts/view/displayResto.js",
          revision: "511d06e93f089e2a5fe5083c35a17fea",
        },
        {
          url: "scripts/view/loading.js",
          revision: "7c5c6c0364fd78d17505a3886ce2ef33",
        },
        {
          url: "scripts/view/navbar.js",
          revision: "23b555e07da6e5ba31db61f46ea427d1",
        },
        {
          url: "scripts/view/searchBar.js",
          revision: "e0a039aabd4071d8ca2518e0753da3ce",
        },
        {
          url: "scripts/view/zerosection.js",
          revision: "6f576ed1b4a5a17b91404f13d9218296",
        },
        {
          url: "styles/detailResto.css",
          revision: "e93a306c43e7e47bedbc541fbefc8e12",
        },
        {
          url: "styles/detailResto.Responsive.css",
          revision: "662fed0f8bf5aea5cecf40d63fb9a117",
        },
        {
          url: "styles/favResto.css",
          revision: "919e6df3875f7e1f1efe31368bfffcd1",
        },
        {
          url: "styles/loading.css",
          revision: "9576d870bc463210c866d84b9f2cc504",
        },
        {
          url: "styles/main.css",
          revision: "a71438d20ca997b17f26d0a645f718c4",
        },
        {
          url: "styles/main.responsive.css",
          revision: "7c519d4320ca529d2b977b891bb4ddea",
        },
        {
          url: "styles/searchBar.css",
          revision: "581c92c8ca409111a1ba880dbbc87a11",
        },
        {
          url: "templates/index.html",
          revision: "e66e76911adc08eec894fa6c7f45d634",
        },
      ],
      {}
    ),
    e.registerRoute(
      /^https:\/\/restaurant-api\.dicoding\.dev\/list\//,
      new e.StaleWhileRevalidate({ cacheName: "mensa-api", plugins: [] }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/restaurant-api\.dicoding\.dev\/detail\//,
      new e.StaleWhileRevalidate({
        cacheName: "mensa-api-detail",
        plugins: [],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/restaurant-api\.dicoding\.dev\/images\/small\//,
      new e.StaleWhileRevalidate({ cacheName: "mensa-image-api", plugins: [] }),
      "GET"
    );
});
//# sourceMappingURL=service-worker.js.map
