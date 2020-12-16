require 'swagger_helper'

describe 'Books API' do
  TAGS = 'Orders'.freeze

  path '/api/v1/orders' do
    get 'Retrieves all orders' do
      description 'List all orders'
      produces 'application/json'
      tags TAGS
  
      response '200', 'orders found' do
        before { create_list(:order, 2) }
  
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/orders/{id}' do
    get 'Retrieves an order' do
      description 'List info about one order (by internal id)'
      produces 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :string
 
      response '200', 'order found' do
        let(:order) { create(:order) }
        let(:id) { order.id }
 
        include_context 'with integration test'
      end
 
      response '404', 'order not found' do
        let(:id) { -1 }
 
        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/orders' do
    post 'Create an order' do
      description 'Create new order'
      consumes 'application/json'
      tags TAGS
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          order: {
            type: :object,
            properties: {
              creation_date: { type: :string, format: 'date-time' },
              delivery_date: { type: :string, format: 'date-time' },
              amount: { type: :integer },
              user_id: { type: :integer },
              book_id: { type: :integer },
              status: { type: :integer }
            },
            required: ['user_id', 'book_id']
          }
        },
        required: ['order']
      }
      produces 'application/json'
      
      response '201', 'order created' do
        let(:params) { { order: attributes_for(:order) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'order creation failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/orders/{id}' do
    put 'Update an order' do
      description 'Update a order'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      parameter name: :params, in: :body, schema: {
        type: :object,
        properties: {
          order: {
            type: :object,
            properties: {
              creation_date: { type: :string, format: 'date-time' },
              delivery_date: { type: :string, format: 'date-time' },
              amount: { type: :integer },
              user_id: { type: :integer },
              book_id: { type: :integer },
              status: { type: :integer }
            },
            required: ['user_id', 'book_id']
          }
        },
        required: ['order']
      }
      produces 'application/json'
      
      response '201', 'order updated' do
        let(:params) { { order: attributes_for(:order) } }
 
        include_context 'with integration test'
      end
 
      response '400', 'order update failed for parameter missing' do
        let(:name) { '' }

        include_context 'with integration test'
      end
    end
  end

  path '/api/v1/orders/{id}' do
    delete 'Delete an order' do
      description 'Delete a order'
      consumes 'application/json'
      tags TAGS
      parameter name: :id, in: :path, type: :integer
      produces 'application/json'
 
      response '200', 'Destroy the order' do
        let(:id) { create(:order).id }
 
        run_test!
      end
    end
  end
end
