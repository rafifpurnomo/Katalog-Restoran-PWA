if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + ".js", a).href),
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
  self.define = (a, c) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let n = {};
    const o = (e) => i(e, r),
      f = { module: { uri: r }, exports: n, require: o };
    s[r] = Promise.all(a.map((e) => f[e] || o(e))).then((e) => (c(...e), n));
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
          revision: "5edf32a202b69e59af30196f0fb6f75e",
        },
        {
          url: "scripts/config/app.js",
          revision: "014ce9ac7ab22c902518bca3245660a5",
        },
        {
          url: "scripts/config/indexDB.config.js",
          revision: "c96f3c93eff38b1d266fa4c2ec28f2f8",
        },
        {
          url: "scripts/index.js",
          revision: "122e329cb51d4ba5a00dee0406d7c615",
        },
        {
          url: "scripts/view/detailResto.js",
          revision: "96c256ae8cba7b1a933fa8149e9457d8",
        },
        {
          url: "scripts/view/displayFavorites.js",
          revision: "4062629b5b4797dcbabb23df2f3ee76a",
        },
        {
          url: "scripts/view/displayResto.js",
          revision: "bc6809faf0f1f619614977cae603cab2",
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
          revision: "4ffceb4a692e7855eb1c7520a63476be",
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
          revision: "3bbbb16528086708c2d1aa97cf7ee0cf",
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
          revision: "faef68fc26656cae7d815cbb0330e856",
        },
        {
          url: "templates/index.html",
          revision: "aeaf2d5aa95bda7316ec876251ff61b3",
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
      /^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\//,
      new e.StaleWhileRevalidate({ cacheName: "mensa-image-api", plugins: [] }),
      "GET"
    );
});
//# sourceMappingURL=service-worker.js.map
