module Api
  module V1
    class BookGenresController < ApplicationController
      # POST /book_genres.json
      def create
        @book_genre = BookGenre.new(request_params)

        if @book_genre.save
          render json: @book_genre
        else
          render json: @book_genre.errors, status: :unprocessable_entity
        end
      end

      private

      def request_params
        params.require(:book_genre).permit(:genre_id, :book_id)
      end
    end
  end
end
