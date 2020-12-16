require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Genres - Books'.freeze

  path '/api/v1/book_genres' do
    post 'Create book_genre' do
      description 'Create a relationship between a book and a genre'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          genre_id: { type: :integer },
          book_id: { type: :integer }
        },
        required: ['genre_id', 'book_id']
      }
      produces 'application/json'
      
      response '201', 'Genre_book created' do
        let(:params) { { book_genre: attributes_for(:book_genre) } }
        include_context 'with integration test'
      end
 
      response '400', 'Book creation failed for parameter missing' do
        let(:book_id) { '' }

        include_context 'with integration test'
      end
    end
  end
end
