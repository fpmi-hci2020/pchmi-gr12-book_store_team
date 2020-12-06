class Book < ApplicationRecord
  has_many :orders
  has_many :favorites
  has_many :book_genres
  has_many :genres, through: :book_genres
  has_many :users, through: :orders
  has_many :author_books
  has_many :authors, through: :author_books

  validates :name, presence: true
end
