module Api
  module V1
    class BooksController < ApplicationController
      before_action :set_book, only: [:show, :edit, :update, :destroy]

      # GET /books.json
      def index
        @books = Book.all

        render json: @books, include: [:authors, :genres]
      end

      # GET /books/1.json
      def show
        render json: @book, include: [:authors, :genres]
      end

      # POST /books.json
      def create
        @book = Book.new(book_params)

        if @book.save
          render json: @book
        else
          render json: @book.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /books/1.json
      def update
        if @book.update(book_params)
          render json: @book, status: :ok
        else
          render json: @book.errors, status: :unprocessable_entity
        end
      end

      # DELETE /books/1.json
      def destroy
        @book.destroy

        head :no_content
      end

      private

      def set_book
        @book = Book.find(params[:id])
      end

      def book_params
        params.require(:book).permit(:name, :image_url, :publishing_year, :quantity, :delivery_date)
      end
    end
  end
end
