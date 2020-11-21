require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Authors'.freeze

  path '/api/v1/authors' do
    get 'Retrieves all authors' do
      description 'List all authors'
      produces 'application/json'
      tags TAGS
  
      response '200', 'authors found' do
        before { create_list(:author, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/authors/{id}' do
    get 'Retrieves an author' do
      description 'List info about one author (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'author found' do
        let(:author) { create(:author) }
        let(:id) { author.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'author not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/authors' do
    post 'Create an author' do
      description 'Create new author'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          author: {
            type: :object,
            properties: {
              name: { type: :string }
            },
            required: ['name']
          }
        },
        required: ['author']
      }
      produces 'application/json'
      
      response '201', 'author created' do
        let(:params) { { author: attributes_for(:author) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'author creation failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/authors/{id}' do
    put 'Update an author' do
      description 'Update a author'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          author: {
            type: :object,
            properties: {
              name: { type: :string }
            },
            required: ['name']
          }
        },
        required: ['author']
      }
      produces 'application/json'
      
      response '201', 'author updated' do
        let(:params) { { author: attributes_for(:author) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'author update failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/authors/{id}' do
    delete 'Delete an author' do
      description 'Delete a author'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      produces 'application/json'
 
      response '200', 'Destroy the author' do
        let(:id) { create(:author).id }
 
        run_test!
      end
    end
  end
end
