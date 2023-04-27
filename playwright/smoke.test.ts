import { test } from '@playwright/test';

test.setTimeout(35e3);

test('Sign in', async ({ page, browser }) => {
  const viewer = await browser.newPage();
  await viewer.goto('http://localhost:3000');

  await page.goto('http://localhost:3000/api/auth/signin');
  await page.type('[name="name"]', 'test');
  await page.click('[type="submit"]');

  await viewer.goto('http://localhost:3000/posts');

  viewer.close();
});
