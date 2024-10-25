import { searchRestaurants } from "../API/api";
import { DetailResto } from "./detailResto";
import { hideLoading, showLoading } from "./loading";

class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="searchSection">
          <div class="searchInputContainer">
            <input
              type="text"
              id="searchInput"
              class="searchInput"
              placeholder="Cari restoran..."
            />
          </div>
          <div class="searchBTN">
            <button id="searchButton" class="searchButton">Cari</button>
          </div>
        </div>
        <div id="loadingSearch" class="loading-spinner" style="display: none;">
            <div class="spinner"></div>
        </div>
         <h1 class="daftarResto-TXT" id="notFoundTXT" style="display: none;">Restoran Not Found</h1>
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
const notFoundTXT = document.getElementById("notFoundTXT");
const loadingSearch = document.getElementById("loadingSearch");
const daftarRestoTXT = document.getElementById("daftarResto-TXT");

searchBar.addEventListener("search", async (event) => {
  const query = event.detail;
  try {
    showLoading(loadingSearch);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = await searchRestaurants(query);
    if (result && result.length > 0) {
      renderRestaurants(result);
      notFoundTXT.style.display = "none";
      
    } else {
      daftarRestoTXT.innerHTML = "";
      daftarRestoran.innerHTML = "";
      notFoundTXT.style.display = "block";
    }
  } catch (error) {
    throw error;
  } finally {
    hideLoading(loadingSearch);
  }
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
    throw error;
  }
}
