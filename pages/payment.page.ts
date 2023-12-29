import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferAccountInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  transferCloseButton = this.page.getByTestId('close-button');

  transferExpectedMessege = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
    await this.transferAccountInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);

    await this.transferButton.click();
    await this.transferCloseButton.click();
  }
}
