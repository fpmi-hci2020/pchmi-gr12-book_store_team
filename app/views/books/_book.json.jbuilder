json.extract! book, :id, :name, :publishing_year, :quantity, :delivery_date, :created_at, :updated_at
json.url book_url(book, format: :json)
