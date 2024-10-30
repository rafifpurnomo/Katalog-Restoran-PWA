import puppeteer from "puppeteer";

jest.setTimeout(20000);

describe("Favorite Button End-to-End Test", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      protocol: "browser",
      pipe: true, 
    });

    page = await browser.newPage();
    await page.goto("http://localhost:8080", { waitUntil: "networkidle2" });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  test("favorite dan batal favorite restoran", async () => {

    await page.waitForSelector("#favoriteButton", { timeout: 15000 });

    await page.click("#favoriteButton");

    await page.waitForSelector(".swal2-popup", { timeout: 10000 });
    const alertText = await page.$eval(".swal2-title", (el) => el.textContent);
    expect(alertText).toBe("Success");

    const buttonTextAfterLike = await page.$eval(
      "#favoriteButton span",
      (el) => el.textContent
    );
    expect(buttonTextAfterLike).toBe("cancel");

    try {
      await page.click("#favoriteButton");
      await page.waitForSelector(".swal2-popup", { timeout: 10000 });
      const alertTextAfterUnlike = await page.$eval(
        ".swal2-title",
        (el) => el.textContent
      );
      expect(alertTextAfterUnlike).toBe("Success");

      await page.waitForFunction(
        () =>
          document.querySelector("#favoriteButton span").textContent ===
          "favorite",
        { timeout: 10000 }
      );

      const buttonTextAfterUnlike = await page.$eval(
        "#favoriteButton span",
        (el) => el.textContent
      );
      expect(buttonTextAfterUnlike).toBe("favorite");
      await delay(2000);
    } catch (error) {
      console.error("Error during unliking process:", error);
    }
  }, 20000); 
});
