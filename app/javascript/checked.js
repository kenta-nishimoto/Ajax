function check() {
  // 下記はindex.htmlのクリックさせたいところを代入している
  // postという要素は投稿の数だけ存在するためpostsにしている
  const posts = document.getElementsByClassName("post");

  postsA = Array.from(posts);
  // ↪︎Array.fromメソッド：postsに入っている情報を配列の形に変えるメソッド

  postsA.forEach(function (post) { 
    // ↪︎配列にしたpostsから一つ一つ情報を取り出している

    if (post.getAttribute("data-load") != null) {
      return null;
    }
    // ↪︎1度でも読み込んでいればpost.setAttribute("data-load", "true");を実行しdata-loadという要素を追加しています。
    //  2回目以降はdata-loadがnullではないもの、すなわち読み込まれたことのある投稿の場合には、処理を中断させる記述をします。
    // (これがないと1秒に1回のペースでメモの投稿にaddEventListenerがセットされてしまいます。
      //これは重複するため、1回のクリックでも複数回処理が実行されてしまうようになります。)

    post.setAttribute("data-load", "true");
    // ↪︎「要素を1つずつに対して、『クリック』」した際に動作するイベント駆動」を設定

    post.addEventListener("click", (e) => {
    // ↪︎投稿をクリックした場合に実行する処理を定義している

    const postId = post.getAttribute("data-id");
    // ↪︎index.htmlの「data-id」を代入している。このidは、URLパラメーターでサーバーにパラメーターとして送る。

    const XHR = new XMLHttpRequest();
    // ↪︎オブジェクトを生成し変数XHRから、XMLHttpRequestのメソッドを使用できるようした。
    // （XMLHttpRequestにはもとから多数のメソッドが用意されている）

    XHR.open("GET", `/posts/${postId}`, true);
    // ↪︎XMLHttpRequestのメソッドのopenメソッド：どのようなリクエストをするのかを指定するメソッド
    // 第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをbooleanで記述

    XHR.responseType = "json";
    // ↪︎↪︎XMLHttpRequestのメソッドのresponseType：レスポンスの形式を指定するメソッドのことです。
    // リクエストを送る際にあらかじめ、レスポンスとして欲しい情報の形式を指定する必要がある。（今回はJSONを指定している）

    XHR.send();
    // ↪︎XMLHttpRequestのメソッドのsendメソッド：リクエストを送ることができる
    // openメソッドで非同期通信をtrueにしている場合は、すぐにレスポンスが返却されます。

    // 下記のonloadとは：XMLHttpRequestのメソッドでレスポンスなどの受信が成功した場合に呼び出されるイベントハンドラーのこと
    XHR.onload = () => {
      const item = XHR.response.post;
      if (item.checked === true) {
        post.setAttribute("data-check", "true");
      } else if (item.checked === false) {
        post.removeAttribute("data-check");
      }

      // 下記の記述はレスポンスがエラーだったときの動き
      // 「status != 200」とはステータスコードの数字が200以外とは、
      // レスポンスが存在しないなど何かしらの不具合があった場合に返却されるコード
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    }

    // 下記の記述はリクエストがエラーの時に作動する
    XHR.onerror = () => {
    // ↪︎XMLHttpRequestのメソッドのonerror：リクエストが失敗した場合に呼び出されるイベントハンドラーのことです。
      alert("Request failed");
    };

    e.preventDefault();
    // ↪︎イベントハンドラーが実行し終わったら今回のイベントをキャンセルする記述

  });
});
}

// 下記の記述だと新しく投稿したものは再読み込みしないため既読のイベントが使用できなくなるため「setInterval」に書き換える
// window.addEventListener("load", check);
setInterval(check, 1000);
// ↪︎setIntervalとは、一定の間隔（時間）ごとに指定した関数などを実行できるメソッドです。
//  setInterval(check, 1000);のように、第一引数に実行する関数を指定し、第二引数に時間（ミリ秒）を指定します。


// 〜XMLHttpRequestのメソッド〜
// Ajaxを可能にするためのオブジェクトで、サーバーにHTTPリクエストを非同期で行うことができます。