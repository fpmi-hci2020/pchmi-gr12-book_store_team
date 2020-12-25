module Api
  module V1
    class OrdersController < ApplicationController
      before_action :set_order, only: [:show, :edit, :update, :destroy]

      # GET /orders.json
      def index
        @orders = Order.all

        render json: @orders, include: [:book]
      end

      # GET /orders/1.json
      def show
        render json: @order, include: [:book]
      end

      # POST /orders.json
      def create
        @order = Order.new(order_params)

        if @order.save
          render json: @order
        else
          render json: @order.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /orders/1.json
      def update
        if @order.update(order_params)
          render json: @order, status: :ok
        else
          render json: @order.errors, status: :unprocessable_entity
        end
      end

      # DELETE /orders/1.json
      def destroy
        @order.destroy

        head :no_content
      end

      private

      def set_order
        @order = Order.find(params[:id])
      end

      def order_params
        params.require(:order).permit(:creation_date, :delivery_date, :amount, :user_id, :book_id, :status)
      end
    end
  end
end
