function memo() {
  const submit = document.getElementById("submit");
  // ↪︎index.htmlの送信部分を代入している
  submit.addEventListener("click", (e) => {
// ↪︎送信をクリックした時にイベントを発生させている

const formData = new FormData(document.getElementById("form"));
// ↪︎FormDataとは、フォームで入力された値を取得できるオブジェクトのことです。
//  new FormData(フォームの要素);のように、オブジェクトを生成し引数にフォームのオブジェクトを渡すことで、
//  そのフォームに入力された値を使用できます。

const XHR = new XMLHttpRequest();
// ↪︎XMLHttpRequestのオブジェクトを生成

XHR.open("POST", "/posts", true);
// ↪︎XMLHttpRequestのopenメソッド

XHR.responseType = "json";
// ↪︎XMLHttpRequestのresponseTypeメソッド

XHR.send(formData);
// ↪︎XMLHttpRequestのsendメソッド

XHR.onload = () => {
  const item = XHR.response.post;
  // ↪︎itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
  const list = document.getElementById("list");
  // ↪︎listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
  const formText = document.getElementById("content");
  // ↪︎次にformTextを取得する理由は、「メモの入力フォーム」をリセットするためです。
  // この処理が終了した時に「入力フォームの文字は入力されたまま」になってしまうため、リセットする必要があります。
  // ここではリセット対象の要素であるcontentという要素を取得しています。

  const HTML = 
    `<div class="post" data-id=${item.id}>
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
      ${item.content}
      </div>
    </div>`;
    // ↪︎このコードは、「メモとして描画する部分のHTML」を定義しています。
    //  HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。

  list.insertAdjacentHTML("afterend", HTML);
  // insertAdjacentHTMLは、指定したHTMLなどを、特定の要素に描画できるメソッドです。
  // listという要素に対して、insertAdjacentHTMLでHTMLを追加します。
  // 第一引数にafterendを指定することで、listの要素直後に挿入できます。

  formText.value = "";
  // ↪︎このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます。
  //  正確には、空の文字列に上書きされるような仕組みです。

  if (XHR.status != 200) {
    alert(`Error ${XHR.status}: ${XHR.statusText}`);
  } else {
    return null;
  }
  // ↪︎レスポンスがエラーだったときの動き
   //「status != 200」とはステータスコードの数字が200以外とは、
   // レスポンスが存在しないなど何かしらの不具合があった場合に返却されるコード
 };

     XHR.onerror = function () {
      alert("Request failed");
    };

    e.preventDefault();
    // ↪︎失敗した場合にアラートを表示する処理を記述
 

})
}
window.addEventListener("load", memo);
// ↪︎ページを読み込んだ後に実行されるように記述



