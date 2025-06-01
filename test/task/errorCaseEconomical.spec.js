const DateTime = require('luxon').DateTime;
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');
const ReservePage = require('../pageobjects/reserve.page');
const TopPage = require('../pageobjects/top.page');

describe('エラーケース_お得なプラン', () => {
  afterEach(async () => {
    if ((await browser.getWindowHandles()).length > 1) {
      await browser.closeWindow();
    }
    await browser.switchWindow(/^宿泊プラン一覧.+$/);
  });

  it('入力値が空白でエラーとなること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得なプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    await ReservePage.setReserveDate('');
    await ReservePage.reserveTerm.setValue('');
    await ReservePage.headCount.setValue('');

    await expect(ReservePage.reserveDateMessage).toHaveText(
      'このフィールドを入力してください。'
    );
    await expect(ReservePage.reserveTermMessage).toHaveText(
      'このフィールドを入力してください。'
    );
    await expect(ReservePage.headCountMessage).toHaveText(
      'このフィールドを入力してください。'
    );
  });

  it('不正な入力値でエラーとなること_お得なプラン_宿泊数（小）', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得なプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const today = DateTime.local().toFormat('yyyy/LL/dd');

    await ReservePage.setReserveDate(today);
    await ReservePage.reserveTerm.setValue('0');
    await ReservePage.headCount.setValue('0');

    await expect(ReservePage.reserveDateMessage).toHaveText(
      '翌日以降の日付を入力してください。'
    );
    await expect(ReservePage.reserveTermMessage).toHaveText(
      '1以上の値を入力してください。'
    );
    await expect(ReservePage.headCountMessage).toHaveText(
      '1以上の値を入力してください。'
    );
  });

  it('不正な入力値でエラーとなること_お得なプラン_宿泊数（大）', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得なプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const after90 = DateTime.local().plus({ days: 91 }).toFormat('yyyy/LL/dd');

    await ReservePage.setReserveDate(after90);
    await ReservePage.reserveTerm.setValue('10');
    await ReservePage.headCount.setValue('10');

    await expect(ReservePage.reserveDateMessage).toHaveText(
      '3ヶ月以内の日付を入力してください。'
    );
    await expect(ReservePage.reserveTermMessage).toHaveText(
      '9以下の値を入力してください。'
    );
    await expect(ReservePage.headCountMessage).toHaveText(
      '9以下の値を入力してください。'
    );
  });

  it('不正な入力値でエラーとなること_お得なプラン_確認_選択してください', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('お得なプラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();
    await ReservePage.submit();

    await expect(ReservePage.contactMessage).toHaveText('');
  });
});