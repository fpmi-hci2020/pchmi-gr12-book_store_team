module Api
  module V1
    class GenresController < ApplicationController
      before_action :set_genre, only: [:show, :edit, :update, :destroy]

      # GET /genres.json
      def index
        @genres = Genre.all

        render json: @genres
      end

      # GET /genres/1.json
      def show
        render json: @genre
      end

      # POST /genres.json
      def create
        @genre = Genre.new(genre_params)

        if @genre.save
          render json: @genre
        else
          render json: @genre.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /genres/1.json
      def update
        if @genre.update(genre_params)
          render json: @genre, status: :ok
        else
          render json: @genre.errors, status: :unprocessable_entity
        end
      end

      # DELETE /genres/1.json
      def destroy
        @genre.destroy

        head :no_content
      end

      private

      def set_genre
        @genre = Genre.find(params[:id])
      end

      def genre_params
        params.require(:genre).permit(:name)
      end
    end
  end
end
