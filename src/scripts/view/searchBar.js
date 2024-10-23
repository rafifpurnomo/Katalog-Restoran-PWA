
import { searchRestaurants } from "../API/api";
import { DetailResto } from "./detailResto";

class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <section class="searchSection">
          <input
            type="text"
            id="searchInput"
            class="searchInput"
            placeholder="Cari restoran..."
          />
          <button id="searchButton" class="searchButton">Cari</button>
        </section>
      `;

    this.querySelector("#searchButton").addEventListener("click", () => {
      const query = this.querySelector("#searchInput").value;
      if (query)
        this.dispatchEvent(new CustomEvent("search", { detail: query }));
    });
  }
}

customElements.define("search-bar", SearchBar);

const searchBar = document.querySelector("#searchBar");
const daftarRestoran = document.querySelector("#daftarRestoran");

searchBar.addEventListener("search", async (event) => {
  const query = event.detail;
  const result = await searchRestaurants(query);
  renderRestaurants(result);
});

function renderRestaurants(restaurants) {
  try {
    daftarRestoran.innerHTML = "";
    restaurants.forEach((restaurant) => {
      const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
      const restaurantItem = document.createElement("div");
      restaurantItem.classList.add("restaurant-item");
      restaurantItem.innerHTML = `
      <div class="container" data-id="${restaurant.id}">
            <h1 class="namaResto">${restaurant.name}</h1>
            <div class="detailResto">
              <img src="${imageUrl}" alt="${restaurant.name}" class="fotoResto">
              <div class="keteranganResto">
                <p class="kotaResto">${restaurant.city}</p>
                <p class="ratingResto">Rating: ${restaurant.rating}</p>
              </div>
              <div class="btn-container">
                <button class="detailButton" data-id="${restaurant.id}">Detail Restoran</button>
              </div>
              <p class="descResto">${restaurant.description}</p>
            </div>
        </div>
    `;
      daftarRestoran.appendChild(restaurantItem);
      document.querySelectorAll(".detailButton").forEach((button) => {
        button.addEventListener("click", (event) => {
          const restoID = event.target.dataset.id;
          DetailResto(restoID);
        });
      });
    });
  } catch (error) {
    console.error("Error:", error);
      daftarRestoran.innerHTML = "<p>Restaurant Not Found.</p>";
  }
}
