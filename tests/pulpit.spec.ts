import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    pulpitPage = new PulpitPage(page);

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange

    const recevierId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferRecevier = 'Chuck Demobankowy';

    // Act

    await pulpitPage.executeQuickPayment(
      recevierId,
      transferAmount,
      transferTitle,
    );

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectedTransferRecevier} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    await pulpitPage.executeMobileTopUp(topupReceiver, topupAmount);

    await expect(pulpitPage.messageText).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;
    const initialBalance = await pulpitPage.moneyValueText.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    await pulpitPage.executeMobileTopUp(topupReceiver, topupAmount);

    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`);
  });
});
