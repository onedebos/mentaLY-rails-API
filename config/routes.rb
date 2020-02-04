Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :providers do
        resources :appointments
      end
      resources :sessions, only: [:create, :destroy]
    end
  end

  
  get '/*path' => 'homepage#index'
  root 'homepage#index'
end
