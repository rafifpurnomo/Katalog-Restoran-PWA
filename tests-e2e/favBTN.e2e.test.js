Feature("Favorite Dan Unfavorite Restaurant");

Scenario("User dapat menambahkan dan menghapus restoran dari favorite", async ({ I }) => {
  const restaurantId = "rqdv5juczeskfw1e867";

  // STEP 1 Pergi ke halaman detail restoran
  I.amOnPage(`#/detail/${restaurantId}`);

  // STEP 2 Menunggu tombol favorite muncul, dan memeriksa keberadaannya
  I.waitForVisible("#favoriteButton", 20);
  I.seeElement("#favoriteButton");

  // STEP 3  Menambahkan restoran ke favorite
  I.click("#favoriteButton");
  I.waitForText("Restoran ditambahkan ke favorite", 20);

  // STEP 4 Setelah menambahkan ke favorite, periksa apakah diarahkan ke halaman favorite
  I.amOnPage("#/favorite");
  I.waitForElement(`.container[data-id="${restaurantId}"]`, 20); 

  // STEP 5 Kembali ke halaman detail untuk menghapus dari favorite
  I.amOnPage(`#/detail/${restaurantId}`);
  I.waitForVisible("#favoriteButton", 20);
  I.click("#favoriteButton");
  I.waitForText("Restoran dihapus dari favorite", 20);

  // STEP 6 Memastikan restoran tidak lagi ada di halaman favorite setelah dihapus
  I.amOnPage("#/favorite");
  I.dontSeeElement(`.container[data-id="${restaurantId}"]`);
});
