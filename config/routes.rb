Rails.application.routes.draw do
  root to: 'posts#index'
# get 'posts/new', to: 'posts#new'←これは削除する
  post 'posts', to: 'posts#create'
end