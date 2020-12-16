require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Authors - Books'.freeze

  path '/api/v1/author_books' do
    post 'Create author_book' do
      description 'Create a relationship between a book and an author'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          author_id: { type: :integer },
          book_id: { type: :integer }
        },
        required: ['author_id', 'book_id']
      }
      produces 'application/json'
      
      response '201', 'Author_book created' do
        let(:params) { { author_book: attributes_for(:author_book) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'Book creation failed for parameter missing' do
        let(:author_id) { '' }

        include_context 'with integration test'
      end
    end
  end
end
