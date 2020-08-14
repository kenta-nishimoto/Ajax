class PostsController < ApplicationController

  #上記のPostsがrouteで設定したコントローラー名
  #下記のindexはroutesで設定したインデックス名

  def index
    @posts = Post.all.order(id: "DESC")
    # orderメソッドは並び順を変えるもの。
    # DESCとすると降順となる
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end 
  
end
