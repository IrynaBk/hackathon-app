Rails.application.routes.draw do
  resources :locations
  
  root "map#index"
end
