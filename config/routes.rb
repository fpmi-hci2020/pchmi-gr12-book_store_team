Rails.application.routes.draw do
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
      resources :orders
    end
  end

  root to: 'index#index'
end
