Rails.application.routes.draw do
  resources :authors
  resources :genres
  resources :favorites
  resources :books
  resources :orders
  devise_for :users
  root to: 'index#index'
end
