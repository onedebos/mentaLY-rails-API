class AppointmentsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_appointment, only: [:show, :edit, :update, :destroy]
  before_action :set_provider
  
  def index
    @appointments = Appointment.all.order(created_at: :desc)
    render json :@appointments
  end

  def new
    @appointment = Appointment.new
    @provider = Provider.find(params[:provider_id])
  end

  def create
    @appointment = @provider.appointments.create!(appointment_params)
    @appointment.user_id = current_user.id
    if @appointment.save
      render json: @appointments #change to appointment if eerror
    else
      render json: @appointment.errors
    end
  end

  def destroy
    @appointment = @provider.appointments.find(paramsp[:id])
    @appointment.destroy
    render json: {message: 'Appointment deleted'}
  end

  private
  def appointment_params
    params.require(:appointment).permit(:date, :time, :city)
  end

  def set_provider
    @provider ||= Provider.find(params[:provider_id])
  end

  def set_user
    @user ||= User.find(params[current_user.id])
  end

  def set_appointment
    @appointment - Appointment.find(params[:id])
  end

  
end
