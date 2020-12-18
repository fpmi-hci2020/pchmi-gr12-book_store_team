module Api
  module V1
    class UsersController < ApplicationController
      def index
        @users = User.all

        render json: @users
      end

      def show
        @user = User.find(params[:id])

        render json: @user
      end

      def update
        @user = User.find(params[:id])

        if @user.update(user_params)
          render json: @user, status: :ok
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:id, :email, :address, :name, :avatar_url)
      end
    end
  end
end
