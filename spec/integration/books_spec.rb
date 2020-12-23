require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Books'.freeze

  path '/api/v1/books' do
    get 'Retrieves all books' do
      description 'List all books'
      produces 'application/json'
      tags TAGS
  
      response '200', 'Books found' do
        before { create_list(:book, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/books/{id}' do
    get 'Retrieves a book' do
      description 'List info about one book (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'Book found' do
        let(:book) { create(:book) }
        let(:id) { book.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'Book not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/books' do
    post 'Create a book' do
      description 'Create new book'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          book: {
            type: :object,
            properties: {
              name: { type: :string },
              description: { type: :string },
              image_url: { type: :string },
              publishing_year: { type: :integer },
              quantity: { type: :integer },
              delivery_date: { type: :string, format: 'date-time' }
            },
            required: ['name']
          }
        },
        required: ['book']
      }
      produces 'application/json'
      
      response '201', 'Book created' do
        let(:params) { { book: attributes_for(:book) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'Book creation failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/books/{id}' do
    put 'Update a book' do
      description 'Update a book'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          book: {
            type: :object,
            properties: {
              name: { type: :string },
              description: { type: :string },
              image_url: { type: :string },
              publishing_year: { type: :integer },
              quantity: { type: :integer },
              delivery_date: { type: :string, format: 'date-time' }
            },
            required: ['name']
          }
        },
        required: ['book']
      }
      produces 'application/json'
      
      response '201', 'Book updated' do
        let(:params) { { book: attributes_for(:book) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'Book update failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/books/{id}' do
    delete 'Delete a book' do
      description 'Delete a book'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      produces 'application/json'
 
      response '200', 'Destroy the book' do
        let(:id) { create(:book).id }
 
        run_test!
      end
    end
  end
end
