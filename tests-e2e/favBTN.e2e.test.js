Feature("Favorite Dan Unfavorite Restaurant");

Scenario("User dapat menambahkan dan menghapus restoran", async ({ I }) => {
  const restaurantId = "rqdv5juczeskfw1e867";

  I.amOnPage(`#/detail/${restaurantId}`);

  I.waitForVisible("#favoriteButton", 20);

  I.seeElement("#favoriteButton");

  I.click("#favoriteButton");
  I.waitForText("Restoran ditambahkan ke favorite", 20);
  I.seeElement(".favorite");

  I.click("#favoriteButton");
  I.waitForText("Restoran dihapus dari favorite", 20);
  I.dontSeeElement(".favorite");
});
