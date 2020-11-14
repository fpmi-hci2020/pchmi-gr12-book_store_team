class User < ApplicationRecord
  has_many :orders
  has_many :favorites
  has_many :books, through: :orders

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
