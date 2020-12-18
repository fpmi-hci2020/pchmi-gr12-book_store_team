Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index'
    end
  end
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  resources :authors
  resources :genres
  resources :favorites
  resources :books
  resources :orders
  devise_for :users

  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :authors
      resources :genres
      resources :favorites
      resources :books
      resources :author_books
      resources :book_genres
      resources :orders
      resources :users
    end
  end

  root to: 'index#index'
end
