import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
     loginPage = new LoginPage(page);

  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await loginPage.login(userId, userPassword)

    // Assert
    await expect(loginPage.userNameText).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectUserLogin = 'tester';
    const errorLoginMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(incorrectUserLogin);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginError).toHaveText(errorLoginMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const incorrectPassword = '12345';
    const errorLoginPassword = 'hasło ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordError).toHaveText(errorLoginPassword);
  });
});
