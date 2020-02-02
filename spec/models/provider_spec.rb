require 'rails_helper'

RSpec.describe Provider, type: :model do
  it { should have_many(:appointments).dependent(:destroy)}
  it { should validate_presence_of(:name) }
  it {should validate_presence_of(:email)}

end
