Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      # get 'providers/index'
      # # get 'providers/new'
      # get 'providers/:id/edit'
      # post 'providers/create'
      # # put 'providers/:id'
      # get '/show/:id', to: 'providers#show'
      # delete '/destroy/:id', to: 'providers#destroy'

      # get 'appointments/index'
      # get 'appointments/new'
      # post 'appointments/create'
      # delete 'appointments/:id', to: 'appointments#destroy'
      resources :providers do
        resources :appointments
      end
    end
  end

  
  devise_for :users, :controllers => { registrations: 'registrations' }
  get '/*path' => 'homepage#index'
  root 'homepage#index'
end
