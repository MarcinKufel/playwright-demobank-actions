import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  paymentButton: any;
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverId = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');

  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');

  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');

  topupAgreementButton = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topupAcceptButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });

  moneyValueText = this.page.locator('#money_value');

  async executeQuickPayment(recevierId: string, transferAmount: string, transferTitle: string): Promise<void>{
    await this.transferReceiverId.selectOption(recevierId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);

    await this.transferButton.click();
    await this.actionCloseButton.click();
  }

  async executeMobileTopUp(topupReceiver: string, topupAmount: string): Promise<void> {
    await this.topupReceiver.selectOption(topupReceiver);
    await this.topupAmount.fill(topupAmount);
    await this.topupAgreementButton.click();
    await this.topupAcceptButton.click();
    await this.actionCloseButton.click();
  }
}
