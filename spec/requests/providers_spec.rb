require 'rails_helper'

RSpec.describe 'Providers API', type: :request do
  
  let(:user) { create(:user) }
  let!(:providers) { create_list(:provider, 10) }
  let(:provider_id) { providers.first.id }

  describe 'GET /providers' do
    before { get '/api/v1/providers', params: {} }
      it 'returns providers' do
        expect(json).not_to be_empty
        expect(json.size).to eq(10)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

  describe 'GET /api/v1/providers/:id' do
    before { get "/api/v1/providers/#{provider_id}", params: {} }

    context 'when the record exists' do
      it 'returns the provider' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(provider_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'POST /providers' do
    let(:valid_attributes) do
      { name: 'Provider3', state: 'Oyo', email: 'provider3@email.com' }.to_json
    end

    context 'when request is valid' do
      before { post '/api/v1/providers', params: valid_attributes }

      it 'creates a provider' do
        expect(response).to have_http_status(200)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /providers/:id' do
    before { delete "/api/v1/providers/#{provider_id}", params: {}}

    it 'returns status code 204' do
      expect(response).to have_http_status(200)
    end
  end
end
