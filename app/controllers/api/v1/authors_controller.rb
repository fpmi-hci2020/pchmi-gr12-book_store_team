module Api
  module V1
    class AuthorsController < ApplicationController
      before_action :set_author, only: [:show, :edit, :update, :destroy]

      # GET /authors.json
      def index
        @authors = Author.all

        render json: @authors
      end

      # GET /authors/1.json
      def show
        render json: @author
      end

      # POST /authors.json
      def create
        @author = Author.new(author_params)

        if @author.save
          render json: @author
        else
          render json: @author.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /authors/1.json
      def update
        if @author.update(author_params)
          render json: @author, status: :ok
        else
          render json: @author.errors, status: :unprocessable_entity
        end
      end

      # DELETE /authors/1.json
      def destroy
        @author.destroy

        head :no_content
      end

      private

      def set_author
        @author = Author.find(params[:id])
      end

      def author_params
        params.require(:author).permit(:name)
      end
    end
  end
end
