class PostsController < ApplicationController

  #上記のPostsがrouteで設定したコントローラー名
  #下記のindexはroutesで設定したインデックス名

  def index
    @posts = Post.all.order(id: "DESC")
    # orderメソッドは並び順を変えるもの。
    # DESCとすると降順となる
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    # ↪︎既読や未読の情報を追加したため「メモ作成時に未読の情報を保存するようにしたこと」
    render json:{ post: post }
    # ↪︎Ajaxを実現するため「レスポンスをJSONに変更した」
  end 

  # 下記は既読の操作を行なっとときに動くアクション
  def checked
    post = Post.find(params[:id])
    # ↪︎パラメーターから送られてくるメモのidを代入している

    if post.checked then
      # ↪︎post.checkedという既読したか否かを判定するプロパティを指定している
      post.update(checked: false)
      # ↪︎既読していれば「既読を解除するためにfalseへ変更」
    else
      post.update(checked: true)
      # ↪︎既読していなければ「既読にするためtrueへ変更」
    end
    # ↪︎この時はupdateというActiveRecordのメソッドを使用して更新しています。

    item = Post.find(params[:id])
    render json: { post: item }
    #↪︎更新したレコードをitem = Post.find(params[:id])で取得し直し、
    # render json:{ post: item }でJSON形式（データ）としてchecked.jsに返却しています。
  end

end
