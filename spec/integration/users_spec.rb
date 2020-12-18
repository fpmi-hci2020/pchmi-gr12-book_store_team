require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Users'.freeze

  path '/api/v1/users' do
    get 'Retrieves all users' do
      description 'List all users'
      produces 'application/json'
      tags TAGS
  
      response '200', 'users found' do
        before { create_list(:user, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/users/{id}' do
    get 'Retrieves an user' do
      description 'List info about one user (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'user found' do
        let(:user) { create(:user) }
        let(:id) { user.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'user not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/users/{id}' do
    put 'Update an user' do
      description 'Update a user'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          user: {
            type: :object,
            properties: {
              email: { type: :string },
              address: { type: :string },
              name: { type: :string },
              avatar_url: { type: :string }
            },
            required: ['id']
          }
        },
        required: ['user']
      }
      produces 'application/json'
      
      response '201', 'user updated' do
        let(:params) { { user: attributes_for(:user) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'user update failed for parameter missing' do
        let(:id) { '' }

        include_context 'with integration test'
      end
    end
  end
end
