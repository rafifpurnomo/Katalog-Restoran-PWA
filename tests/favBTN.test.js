import { beforeEach, describe, jest, test } from "@jest/globals";
import FavoriteRestoIdb from "../src/scripts/config/indexDB.config";
import { fireEvent } from "@testing-library/dom";

jest.mock("../src/scripts/config/indexDB.config", () => ({
  putResto: jest.fn(),
  deleteResto: jest.fn(),
}));

describe("Testing favorite button", () => {
  let favoriteButton;
  let restaurant;
  let isFavorite;

  beforeEach(() => {
    isFavorite = false;
    restaurant = { id: "1", name: "Test Resto" };

    favoriteButton = document.createElement("button");
    favoriteButton.id = "favoriteButton";
    document.body.appendChild(favoriteButton);

    favoriteButton.addEventListener("click", async () => {
      if (isFavorite) {
        await FavoriteRestoIdb.deleteResto(restaurant.id);
        isFavorite = false;
        favoriteButton.innerHTML = `<span class="material-icons">favorite</span>`;
      } else {
        await FavoriteRestoIdb.putResto(restaurant);
        isFavorite = true;
        favoriteButton.innerHTML = `<span class="material-icons">cancel</span>`;
      }
    });
  });

  test("menambahkan restoran ke favorite", async () => {
    await fireEvent.click(favoriteButton);

    expect(FavoriteRestoIdb.putResto).toHaveBeenCalledWith(restaurant);
    expect(isFavorite).toBe(true);
  });

  test("menghapus restoran dari favorite", async () => {
    isFavorite = true;
    await fireEvent.click(favoriteButton);

    expect(FavoriteRestoIdb.deleteResto).toHaveBeenCalledWith(restaurant.id);
    expect(isFavorite).toBe(false);
  });
});
