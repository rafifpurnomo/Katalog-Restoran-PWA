import { getAllRestaurant } from "../API/api";
import  DetailResto  from "./detailResto";
import { hideLoading, showLoading } from "./loading";

const displayResto = {
  async render() {
    return `
      <div id="loadingHome" class="loading-spinner" style="display: none;">
        <div class="spinner"></div>
      </div>
      <div id="daftarResto-TXT"></div>
      <div id="daftarRestoran"></div>
    `;
  },

  async afterRender() {
    const daftarRestoran = document.getElementById("daftarRestoran");
    const daftarRestoTXT = document.getElementById("daftarResto-TXT");
    const idLoadingHome = document.getElementById("loadingHome");

    try {
      showLoading(idLoadingHome);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      daftarRestoTXT.innerHTML = `<h1 class="daftarResto-TXT">Daftar Restoran</h1>`;

      const restaurants = await getAllRestaurant();
      if (!restaurants || restaurants.length === 0) {
        throw new Error("No restaurants found");
      }

      daftarRestoran.innerHTML = ""; // Reset daftarRestoran
      restaurants.forEach((restaurant) => {
        const imageUrl = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
        const restoranElement = `
          <div class="container" data-id="${restaurant.id}">
            <h1 class="namaResto">${restaurant.name}</h1>
            <div class="detailResto">
              <img src="${imageUrl}" loading="lazy" crossorigin="anonymous" alt="${restaurant.name}" class="fotoResto">
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
        daftarRestoran.innerHTML += restoranElement;
      });

      // Menambahkan event listener untuk tombol detail
      document.querySelectorAll(".detailButton").forEach((button) => {
        button.addEventListener("click", (event) => {
          const restoID = event.target.dataset.id;
          window.location.href = `#/detail/${restoID}`;
          console.log(restoID);
        });
      });

    } catch (error) {
      daftarRestoran.innerHTML = "<p>404 Not Found.</p>";
      throw error;
    } finally {
      hideLoading(idLoadingHome);
    }
  },
};

export default displayResto;
