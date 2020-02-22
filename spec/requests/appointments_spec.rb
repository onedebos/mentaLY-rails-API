require 'rails_helper'

RSpec.describe 'Appointments API', type: :request do
  
  let(:user) { create(:user) }
  let(:user_id) { user.id }
  let!(:provider) { create(:provider) }
  let!(:appointments) { create_list(:appointment, 20, provider_id: provider.id, user_id: user.id) }
  let(:provider_id) { provider.id }
  let(:id) { appointments.first.id }
  

  describe 'GET /appointment' do
    
    before { get "/api/v1/providers/#{provider_id}/appointments", params: {} }
      context 'when provider exists' do
        it 'returns status code 200' do
          expect(response).to have_http_status(200)
        end
  
        it 'returns all provider appointments' do
          expect(json.size).to eq(20)
        end
      end

      describe 'POST /providers/:provider_id/appointments' do
        let(:valid_attributes) { { city: 'Ondo', date: "2020-02-22", time: "2000-01-01 01:01:00", user_id: user.id }.to_json }
    
        context 'when request attributes are valid' do
          before do
            post "/api/v1/providers/#{provider_id}/appointments", params: valid_attributes
          end
    
          it 'returns status code 201' do
            expect(response).to have_http_status(200)
          end
        end
    end


  end
end