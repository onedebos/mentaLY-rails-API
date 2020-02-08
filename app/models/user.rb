class User < ApplicationRecord
  has_secure_password
  has_many :appointments
  validates_presence_of :password_digest, :name, :email
  validates :email, uniqueness: true
end
