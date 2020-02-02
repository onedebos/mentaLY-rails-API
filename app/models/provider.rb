class Provider < ApplicationRecord
    has_many :appointments, dependent: :destroy
    validates_presence_of :name, :email
end
