require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Favorites'.freeze

  path '/api/v1/favorites' do
    get 'Retrieves all favorites' do
      description 'List all favorites'
      produces 'application/json'
      tags TAGS
  
      response '200', 'favorites found' do
        before { create_list(:favorite, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/favorites/{id}' do
    get 'Retrieves a favorite' do
      description 'List info about one favorite (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'favorite found' do
        let(:favorite) { create(:favorite) }
        let(:id) { favorite.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'favorite not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/favorites' do
    post 'Create a favorite' do
      description 'Create new favorite'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          favorite: {
            type: :object,
            properties: {
              user_id: { type: :integer },
              book_id: { type: :integer }
            },
            required: ['user_id', 'book_id']
          }
        },
        required: ['favorite']
      }
      produces 'application/json'
      
      response '201', 'favorite created' do
        let(:params) { { favorite: attributes_for(:favorite) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'favorite creation failed for parameter missing' do
        let(:user_id) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/favorites/{id}' do
    put 'Update a favorite' do
      description 'Update a favorite'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          favorite: {
            type: :object,
            properties: {
              user_id: { type: :integer },
              book_id: { type: :integer }
            },
            required: ['user_id', 'book_id']
          }
        },
        required: ['favorite']
      }
      produces 'application/json'
      
      response '201', 'favorite updated' do
        let(:params) { { favorite: attributes_for(:favorite) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'favorite update failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/favorites/{id}' do
    delete 'Delete a favorite' do
      description 'Delete a favorite'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      produces 'application/json'
 
      response '200', 'Destroy the favorite' do
        let(:id) { create(:favorite).id }
 
        run_test!
      end
    end
  end
end
