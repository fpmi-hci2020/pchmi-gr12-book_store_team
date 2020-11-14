json.extract! order, :id, :creation_date, :delivery_date, :amount, :user_id, :book_id, :created_at, :updated_at
json.url order_url(order, format: :json)
