import { getDetailResto } from "../API/api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import FavoriteRestoIdb from "../config/indexDB.config";
import UrlParser from "../routes/urlParser";

const DetailResto = {
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await getDetailResto(url.id);
    const imageUrl = `https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}`;
    const isFavorite = await FavoriteRestoIdb.getResto(url.id);

    return `
    <section id="detailSection" class="detailRestoran">
      <h1 class="daftarResto-TXT">Daftar Restoran ${restaurant.name}</h1>
      <div class="detailPage">
        <div class="containerIMG">
          <img src="${imageUrl}" crossorigin="anonymous" alt="${restaurant.name}" class="detailImage">
          <div class="nameNbuttonSave">
            <h1>${restaurant.name}</h1>
            <button id="favoriteButton" class="${isFavorite ? "favorite" : ""}">
              <span class="material-icons">${isFavorite ? "cancel" : "favorite"}</span>
            </button>
          </div>
          <div class="cityNrating">
            <p class="kota">Kota: ${restaurant.city}</p>
            <p class="rating">Rating: <span>${restaurant.rating}</span></p>
          </div>
          <div class="CategoryContainer"></div>
          <div class="descContainer">
            <div class="desc">
              <p>${restaurant.description}</p>
            </div>
            <div class="menuDesc">
              <div class="makanan">
                <h3>Makanan:</h3>
                <ul class="makanan"></ul>  
              </div>
              <div class="minuman">
                <h3>Minuman:</h3>
                <ul class="minuman"></ul>  
              </div>  
            </div>
          </div>
          <div class="margin-tp"></div>
          <h2>Our Reviewer</h2>
          <div class="ratingContainer"></div>
        </div>
      </div>
    </section>
  `;
  },

  async afterRender() {
    const detailSection = document.querySelector("#detailSection");
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    if (!detailSection) {
      console.error("Detail section tidak ditemukan");
      return;
    }
    try {
      const restaurant = await getDetailResto(url.id);
      const categoryContainer =
        detailSection.querySelector(".CategoryContainer");

      restaurant.categories.forEach((category) => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("categoryItem");
        categoryElement.innerHTML = `<p>${category.name}</p>`;
        categoryContainer.appendChild(categoryElement);
      });

      // INI BUAT MAKANAN RESTORAN
      const foodList = detailSection.querySelector(".makanan");
      restaurant.menus.foods.forEach((food) => {
        const foodItem = document.createElement("li");
        foodItem.textContent = food.name;
        foodList.appendChild(foodItem);
      });

      // INI BUAT MINUMAN RESTORAN
      const drinkList = detailSection.querySelector(".minuman");
      restaurant.menus.drinks.forEach((drink) => {
        const drinkItem = document.createElement("li");
        drinkItem.textContent = drink.name;
        drinkList.appendChild(drinkItem);
      });

      // INI BUAT RATING RESTORAN
      const ratingContainer = detailSection.querySelector(".ratingContainer");
      restaurant.customerReviews.forEach((netizen) => {
        const ratingElement = document.createElement("div");
        ratingElement.classList.add("ratingItem");

        const nameElement = document.createElement("p");
        nameElement.textContent = netizen.name;

        const reviewElement = document.createElement("p");
        reviewElement.textContent = netizen.review;

        const dateElement = document.createElement("h2");
        dateElement.textContent = netizen.date;

        ratingElement.appendChild(dateElement);
        ratingElement.appendChild(nameElement);
        ratingElement.appendChild(reviewElement);

        ratingContainer.appendChild(ratingElement);
      });

      const favoriteButton = detailSection.querySelector("#favoriteButton");
      favoriteButton.addEventListener("click", async () => {
        if (await FavoriteRestoIdb.getResto(url.id)) {
          await FavoriteRestoIdb.deleteResto(url.id);
          favoriteButton.classList.remove("favorite");
          favoriteButton.innerHTML = `<span class="material-icons">favorite</span>`;
          Swal.fire({
            title: "Success",
            text: "Restoran dihapus dari favorite",
            icon: "success",
            confirmButtonText: "continue",
          });
        } else {
          await FavoriteRestoIdb.putResto(restaurant);
          favoriteButton.classList.add("favorite");
          favoriteButton.innerHTML = `<span class="material-icons">cancel</span>`;
          Swal.fire({
            title: "Success",
            text: "Restoran ditambahkan ke favorite",
            icon: "success",
            confirmButtonText: "continue",
          });
        }
      });

    } catch (error) {
      throw error;
    }
  },
};

export default DetailResto;
