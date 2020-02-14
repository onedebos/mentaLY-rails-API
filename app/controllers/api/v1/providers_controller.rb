class Api::V1::ProvidersController < ApplicationController
  include CurrentUserConcern

  def index
    provider = Provider.all.order(created_at: :desc)
    render json: provider
  end

  def create
    provider = Provider.create!(provider_params)
    if provider
      render json: provider
    else
      render json: provider.errors
    end
  end

  def show
    if provider
      render json: provider
    else
      render json: provider.errors
    end
  end

  def update
    provider = Provider.find(params[:id])
    provider.update!(provider_params)
    render json: provider
  end

  def edit
    @provider = Provider.find(params[:id])
  end

  def destroy
    provider&.destroy
    render json: { message: 'Provider deleted' }
  end

  private

  def provider_params
    params.permit(:name, :email, :state, :description, :logo)
  end

  def provider
    @provider ||= Provider.find(params[:id])
  end
end
