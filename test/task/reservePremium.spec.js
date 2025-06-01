const DateTime = require('luxon').DateTime;
const ConfirmPage = require('../pageobjects/confirm.page');
const LoginPage = require('../pageobjects/login.page');
const MyPage = require('../pageobjects/my.page');
const PlansPage = require('../pageobjects/plans.page');
const ReservePage = require('../pageobjects/reserve.page');
const TopPage = require('../pageobjects/top.page');

describe('宿泊予約', () => {
  afterEach(async () => {
    if ((await browser.getWindowHandles()).length > 1) {
      await browser.closeWindow();
    }
    await browser.switchWindow(/^宿泊プラン一覧.+$/);
  });

  it('プレミア会員でログインすること', async () => {
    await TopPage.open();
    await TopPage.goToLoginPage();
    await LoginPage.email.setValue('ichiro@example.com');
    await LoginPage.password.setValue('password');
    await LoginPage.submit();

    await expect(MyPage.header).toHaveText('マイページ');
  });

  it('宿泊予約の入力から宿泊予約確認までの一連の流れが正常に動作すること', async () => {
    await MyPage.goToPlansPage();
    await PlansPage.openPlanByTitle('テーマパーク優待プラン');
    await browser.switchWindow(/^宿泊予約.+$/);
    await ReservePage.submitButton.waitForClickable();

    const expectedStart = DateTime.fromFormat('25/07/15', 'yyyy/LL/dd');
    const expectedEnd = expectedStart.plus({ days: 3 });
    const expectedTotalBill = '合計 66,000円（税込み）';
    const expectedTerm = `${expectedStart.toFormat(
      'yyyy年L月d日'
    )} 〜 ${expectedEnd.toFormat('yyyy年L月d日')} 3泊`;

    await ReservePage.setReserveDate(expectedStart);
    await ReservePage.reserveTerm.setValue('3');
    await ReservePage.headCount.setValue('2');
    await ReservePage.setBreakfastPlan(true);
    await ReservePage.setEarlyCheckInPlan(false);
    await ReservePage.setSightseeingPlan(false);
    await ReservePage.contact.selectByVisibleText('電話でのご連絡');
    await ReservePage.tel.setTel('00011112222');

    await expect(await ReservePage.totalBill.getText()).toBe('66,000円');

    await ReservePage.submit();

    await expect(ConfirmPage.totalBill).toHaveText(expectedTotalBill);
    await expect(ConfirmPage.planName).toHaveText('プレミアムプラン');
    await expect(ConfirmPage.term).toHaveText(expectedTerm);
    await expect(ConfirmPage.headCount).toHaveText('2名様');
    await expect(ConfirmPage.plans).toHaveTextContaining('朝食バイキング');
    await expect(ConfirmPage.plans).not.toHaveTextContaining(
      '昼からチェックインプラン'
    );
    await expect(ConfirmPage.plans).not.toHaveTextContaining(
      'お得な観光プラン'
    );
    await expect(ConfirmPage.username).toHaveText('山田一郎様');
    await expect(ConfirmPage.contact).toHaveText('電話：00011112222');
    await expect(ConfirmPage.comment).toHaveText('なし');

    await ConfirmPage.confirm();
  });

  it('宿泊予約スクリーンに戻れること', async () => {
    await expect(ConfirmPage.modalTitle).toHaveText(
      '予約を完了しました'
    )

    await ConfirmPage.close();

    await expect(
      await browser.waitUntil(
        async () => (await browser.getWindowHandles()).length === 1
      )
    ).toBeTruthy();
  });
});
