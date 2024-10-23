import { getAllRestaurant } from "../API/api";
import { DetailResto } from "./detailResto";
import { hideLoading, showLoading } from "./loading";
const daftarRestoran = document.getElementById("daftarRestoran");
const daftarRestoTXT = document.getElementById("daftarResto-TXT");

export async function displayRestoran() {
  try {
    showLoading();
    await new Promise((resolve) => setTimeout(resolve, 1500));
    daftarRestoTXT.innerHTML=`
      <h1 class="daftarResto-TXT">Daftar Restoran</h1>
    `
    

    const restaurants = await getAllRestaurant();
    if (!restaurants || restaurants.length === 0) {
      throw new Error("No restaurants found");
    }
    daftarRestoran.innerHTML = "";
    restaurants.forEach((restaurant) => {
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
      daftarRestoran.innerHTML += restoranElement;
    });
    document.querySelectorAll(".detailButton").forEach((button) => {
      button.addEventListener("click", (event) => {
        const restoID = event.target.dataset.id;
        DetailResto(restoID);
      });
    });
  } catch (error) {
    console.error("Error:", error);
    daftarRestoran.innerHTML = "<p>404 Not Found.</p>";
  } finally {
    hideLoading();
  }
}
