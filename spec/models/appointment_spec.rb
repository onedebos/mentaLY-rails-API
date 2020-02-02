require 'rails_helper'

RSpec.describe Appointment, type: :model do
  it { should belong_to(:provider)}
  it {should belong_to(:user)}
  it {should validate_presence_of(:city)}
  it {should validate_presence_of(:time)}
  it {should validate_presence_of(:date)}

end
