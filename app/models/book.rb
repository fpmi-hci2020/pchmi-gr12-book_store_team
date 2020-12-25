class Book < ApplicationRecord
  has_many :orders
  has_many :favorites
  has_many :book_genres
  has_many :genres, through: :book_genres
  has_many :users, through: :orders
  has_many :author_books
  has_many :authors, through: :author_books

  validates :name, presence: true

  scope :by_title, -> (value) { where(name: value) }
  scope :by_author, -> (author_name) { joins(:authors).where(authors: { name: author_name }) }
  scope :by_genre, -> (genre_name) { joins(:genres).where(genres: { name: genre_name }) }
end
