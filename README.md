プロンプト集

ーーーーーーーーーーーーーー

Webサイト側の
<output class="h1 my-2" name="total-bill" id="total-bill">12,500円</output>
の12500だけを取得したい

ーーーーーーーーーーーーーー

66,000円というテキストを持っているか確認したい 
await expect(ReservePage.totalBill.getText());

ーーーーーーーーーーーーーー

特定のファイルだけテストしたいときのコマンドは？

ーーーーーーーーーーーーーー

plans.page.js

module.exports = new PlansPage();

  <div class="col-12 col-md-6 col-lg-4">
  <div class="card text-center shadow-sm mb-3">
    <div class="card-body">
      <h5 class="card-title">テーマパーク優待プラン</h5>
      <ul class="list-unstyled">
        <li>大人1名10,000円</li>
        <li>1名様から</li>
        <li>部屋指定なし</li>
      </ul>
      <a href="./reserve.html?plan-id=9" class="btn btn-primary" target="_blank" rel="opener">このプランで予約</a>
    </div>
  </div>
</div>

テーマパーク優待プランを取得するためにはこの実装で十分ですか？

ーーーーーーーーーーーーーー

文字コードがあっていない可能性はありますか？

ーーーーーーーーーーーーーー

npm testを実行するとchromeがゲストで開き制御されますが、脆弱なパスワードでテストしているためセキュリティ警告が現れてしまいます。この警告を無視するためにはどうすればよいでしょうか

ーーーーーーーーーーーーーー

