module Api
  module V1
    class FavoritesController < ApplicationController
      before_action :set_favorite, only: [:show, :edit, :update, :destroy]

      # GET /favorites.json
      def index
        @favorites = Favorite.all

        render json: @favorites
      end

      # GET /favorites/1.json
      def show
        render json: @favorite
      end

      # POST /favorites.json
      def create
        @favorite = Favorite.new(favorite_params)

        if @favorite.save
          render json: @favorite
        else
          render json: @favorite.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /favorites/1.json
      def update
        if @favorite.update(favorite_params)
          render json: @favorite, status: :ok
        else
          render json: @favorite.errors, status: :unprocessable_entity
        end
      end

      # DELETE /favorites/1.json
      def destroy
        @favorite.destroy

        head :no_content
      end

      private

      def set_favorite
        @favorite = Favorite.find(params[:id])
      end

      def favorite_params
        params.require(:favorite).permit(:book_id, :user_id)
      end
    end
  end
end
