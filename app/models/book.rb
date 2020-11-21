class Book < ApplicationRecord
  has_many :orders
  has_many :favorites
  has_many :genres
  has_many :users, through: :orders

  validates :name, presence: true
end
