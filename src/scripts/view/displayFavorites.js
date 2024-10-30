import FavoriteRestoIdb from "../config/indexDB.config";
import { hideLoading, showLoading } from "./loading";

const displayFavorites = {
  async render() {
    return `
      <h1 class="daftarResto-TXT">Daftar Restoran Favorit</h1>
      <div id="loadingFavorite" class="loading-spinner" style="display: none;">
        <div class="spinner"></div>
      </div>
      <div id="favoriteContainer"></div>
    `;
  },

  async afterRender() {
    const favoriteContainer = document.getElementById("favoriteContainer");
    const idLoadingFav = document.getElementById("loadingFavorite");

    try {
      showLoading(idLoadingFav);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const favorites = await FavoriteRestoIdb.getAllResto();
      if (favorites.length === 0) {
        favoriteContainer.innerHTML =
          '<p class="empty-favorites">Tidak ada restoran favorit</p>';
        return;
      }
      favoriteContainer.innerHTML = "";

      favorites.forEach((restaurant) => {
        const imageUrl = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
        const restoranElement = `
          <div class="container" data-id="${restaurant.id}">
            <h1 class="namaResto">${restaurant.name}</h1>
            <div class="detailResto">
              <img src="${imageUrl}" crossorigin="anonymous" alt="${restaurant.name}" class="fotoResto">
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
        favoriteContainer.innerHTML += restoranElement;
      });

      document.querySelectorAll(".detailButton").forEach((button) => {
        button.addEventListener("click", (event) => {
          const restoID = event.target.dataset.id;
          window.location.href = `#/detail/${restoID}`;
        });
      });
    } catch (error) {
      console.error("Error fetching favorite restaurants:", error);
    } finally {
      hideLoading(idLoadingFav);
    }
  },
};

export default displayFavorites;
