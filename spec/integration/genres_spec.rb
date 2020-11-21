require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Genres'.freeze

  path '/api/v1/genres' do
    get 'Retrieves all genres' do
      description 'List all genres'
      produces 'application/json'
      tags TAGS
  
      response '200', 'genres found' do
        before { create_list(:genre, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/genres/{id}' do
    get 'Retrieves a genre' do
      description 'List info about one genre (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'genre found' do
        let(:genre) { create(:genre) }
        let(:id) { genre.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'genre not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/genres' do
    post 'Create a genre' do
      description 'Create new genre'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          genre: {
            type: :object,
            properties: {
              name: { type: :string }
            },
            required: ['name']
          }
        },
        required: ['genre']
      }
      produces 'application/json'
      
      response '201', 'genre created' do
        let(:params) { { genre: attributes_for(:genre) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'genre creation failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/genres/{id}' do
    put 'Update a genre' do
      description 'Update a genre'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          genre: {
            type: :object,
            properties: {
              name: { type: :string }
            },
            required: ['name']
          }
        },
        required: ['genre']
      }
      produces 'application/json'
      
      response '201', 'genre updated' do
        let(:params) { { genre: attributes_for(:genre) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'genre update failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/genres/{id}' do
    delete 'Delete a genre' do
      description 'Delete a genre'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      produces 'application/json'
 
      response '200', 'Destroy the genre' do
        let(:id) { create(:genre).id }
 
        run_test!
      end
    end
  end
end
