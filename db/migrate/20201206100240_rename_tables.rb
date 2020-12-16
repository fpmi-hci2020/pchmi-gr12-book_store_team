class RenameTables < ActiveRecord::Migration[6.0]
  def change
    rename_table :authors_books, :author_books
    rename_table :books_genres, :book_genres
  end
end
