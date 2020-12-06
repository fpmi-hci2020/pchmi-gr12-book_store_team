module Api
  module V1
    class AuthorBooksController < ApplicationController
      # POST /author_books.json
      def create
        @author_book = AuthorBook.new(request_params)

        if @author_book.save
          render json: @author_book
        else
          render json: @author_book.errors, status: :unprocessable_entity
        end
      end

      private

      def request_params
        params.permit(:author_id, :book_id)
      end
    end
  end
end
