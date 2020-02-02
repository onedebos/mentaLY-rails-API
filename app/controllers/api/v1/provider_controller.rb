class Api::V1::ProviderController < ApplicationController
  before_action :set_provider, only: %i[show edit update destroy]
  before_action :authenticate_user!

  def index
    provider = Provider.all.order(created_at: :desc)
    render json :provider
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
    @provider = Provider.find(params[:id])
    if @provider
      render json: @provider
    else
      render json: @provider.errors
    end
  end

  def update
    if @provider.update(provider_params)
      render json: @provider
    else
      render json: @provider.errors
    end
  end

  def new
    provider = Provider.new
  end

  def edit
  end

  def destroy
    @provider.destroy
    render json: {message: 'Provider deleted'}
  end

  private

  def provider_params
    params.permit(:name, :email, :state, :description, :logo)
  end

  def set_provider
    @provider ||= Provider.find(params[:id])
  end
end

