require "rails_helper"

RSpec.describe Api::V1::ProvidersController, type: :controller do

    describe "GET #index" do
        before do
        get :index
    end

  it "returns http success" do
    expect(response).to have_http_status(200)
  end

it "JSON body response contains expected providers list" do
 json_response = JSON.parse(response.body)
 expect (json_response.keys).to match_array([:name, :email, :state, :logo, :description])
end

end
end