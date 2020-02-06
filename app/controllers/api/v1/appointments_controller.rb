class Api::V1::AppointmentsController < ApplicationController
  # before_action :authenticate_user!
  before_action :set_appointment, only: [:show, :edit, :update, :destroy]

  include CurrentUserConcern
  
  
  def index
    @appointments = Appointment.all.order(created_at: :desc)
    render json: @appointments
  end

  def create
  
    @provider = Provider.find(params[:provider_id])
    @appointment = @provider.appointments.create!(appointment_params)
    @appointment.user_id = @current_user.id
    if @appointment.save
      render json: @appointment
    else
      render json: @appointment.errors
    end
  end

  def destroy
    @appointment = @provider.appointments.find(params[:id])
    @appointment.destroy
    render json: {message: 'Appointment deleted'}
  end

  def logged_in
    if @current_user
        render json: {
            logged_in: true,
            user: @current_user
        }
    else
        render json: {
            logged_in: false
        }
    end
end
  private
  def appointment_params
    params.require(:appointment).permit(:date, :time, :city, :user_id)
  end

  def set_provider
    @provider = Provider.find(params[:provider_id])
  end

  # def set_current_user
  #   @user = User.find(@current_user)
  # end

  def set_appointment
    @appointment = Appointment.find(params[:id])
  end

  
end
