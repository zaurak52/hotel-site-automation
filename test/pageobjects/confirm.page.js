const Page = require("./page");

class ConfirmPage extends Page {
  get totalBill() { return $("#total-bill"); }
  get planName() { return $("#plan-name"); }
  get term() { return $("#term"); }
  get headCount() { return $("#head-count"); }
  get plans() { return $("#plans"); }
  get username() { return $("#username"); }
  get contact() { return $("#contact"); }
  get comment() { return $("#comment"); }
  get confirmButton() { return $('button[data-target="#success-modal"]'); }
  get successModal() { return $("#success-modal"); }
  get modalTitle() { return $("#success-modal > div > div > .modal-title"); } //add
  get modalMessage() { return $("#success-modal > div > div > .modal-body"); }
  get closeButton() { return $("#success-modal > div > div > div > button.btn-success"); }

  async confirm() {
    await (await this.confirmButton).click();
    await (await this.successModal).waitForDisplayed();
  }

  async close() {
    await (await this.closeButton).click();
  }
}

module.exports = new ConfirmPage();
