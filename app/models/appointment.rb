class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :provider
  validates_presence_of :city, :date, :time
end
