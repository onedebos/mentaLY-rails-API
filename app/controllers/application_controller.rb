class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def set_current_user
    return @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
