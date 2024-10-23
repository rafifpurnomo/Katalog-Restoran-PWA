import FavoriteRestoIdb from "../config/indexDB.config";
import { DetailResto } from "./detailResto";
import { hideLoading, showLoading } from "./loading";


const detailSection = document.getElementById("detailSection");
const favoriteSection = document.getElementById("favoriteSection");

export async function displayFavorites() {
  try {
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const favorites = await FavoriteRestoIdb.getAllResto();
    const favoriteContainer = document.getElementById("favoriteContainer");

    if (favorites.length === 0) {
      favoriteContainer.innerHTML =
        '<p class="empty-favorites">Tidak ada restoran favorit</p>';
      return;
    }

    favoriteContainer.innerHTML = "";
    favorites.forEach((restaurant) => {
      const imageUrl = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
      const restoranElement = `
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
      favoriteContainer.innerHTML += restoranElement;
    });
    document.querySelectorAll(".detailButton").forEach((button) => {
      button.addEventListener("click", (event) => {
        const restoID = event.target.dataset.id;
        DetailResto(restoID);
        favoriteSection.style.display = "none";
        detailSection.style.display = "block";
      });
    });
  } catch (error) {
    console.error("Error:", error);
  } finally {
    hideLoading();
  }
}

