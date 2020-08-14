Rails.application.routes.draw do
  root to: 'posts#index'
# get 'posts/new', to: 'posts#new'←これは削除する
  post 'posts', to: 'posts#create'
  # 下記はメモのidを取得するために記述（pathパラメーターで記述）
  get 'posts/:id', to: 'posts#checked'
end