const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 150,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();

  await page.goto("https://netflixgpt-d4e56.web.app");

  await page.setViewport({ width: 1920, height: 1080 });

  // Selector
  const signUp =
    "#root > div > div > form > p.py-4.hover\\:underline.cursor-pointer";

  const signIn = "#root > div > div > form > button";

  const emailInput = "#root > div > div > form > input:nth-child(2)";
  const passwordInput = "#root > div > div > form > input:nth-child(3)";

  //------------ Sign In page ---------------------

  //await page.waitForSelector(signUp);
  await page.waitForSelector(signIn);
  await page.waitForSelector(emailInput);
  await page.waitForSelector(passwordInput);

  await page.type(emailInput, "farhan@gmail.com");
  await page.type(passwordInput, "Farhan@123");

  await Promise.all([
    page.click(signIn),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  const GPTSearchPage =
    "#root > div > div > div.absolute.px-8.py-2.bg-linear-to-b.from-black\\/60.to-transparent.w-full.z-10.flex.justify-between.flex-col.md\\:flex-row > div > button.flex.items-center.gap-2.bg-linear-to-r.from-slate-800.to-slate-900.text-white.font-medium.text-sm.py-1\\.5.px-5.mx-4.my-3\\.5.rounded-lg.border.border-slate-700.shadow-md.shadow-black\\/40.hover\\:from-slate-700.hover\\:to-slate-800.hover\\:scale-105.active\\:scale-95.transition-all.duration-200";

  await page.waitForSelector(GPTSearchPage, { visible: true });
  await page.waitForSelector(GPTSearchPage);

  await page.evaluate((selector) => {
    const btn = document.querySelector(selector);
    btn.click();
  }, GPTSearchPage);

  const GPTSearchInput =
    "#root > div > div > div:nth-child(3) > div > form > input";
  const GPTSearchBtn =
    "#root > div > div > div:nth-child(3) > div > form > button";

  await page.waitForSelector(GPTSearchInput, { visible: true });
  await page.waitForSelector(GPTSearchBtn, { visible: true });

  await page.type(GPTSearchInput, "tamil horror movies");
  await page.click(GPTSearchBtn);

  const signOutBtn =
    "#root > div > div > div.absolute.px-8.py-2.bg-linear-to-b.from-black\\/60.to-transparent.w-full.z-10.flex.justify-between.flex-col.md\\:flex-row > div > button.flex.items-center.gap-2.bg-gray-900.text-gray-200.font-medium.text-sm.py-1\\.5.px-5.mx-4.my-3\\.5.rounded-lg.border.border-gray-700.shadow-md.hover\\:bg-red-600.hover\\:text-white.hover\\:border-red-600.active\\:scale-95.transition-all.duration-200";

  await page.waitForSelector(signOutBtn, { visible: true });

  await page.click(signOutBtn);
  await browser.close();
})();
