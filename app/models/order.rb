class Order < ApplicationRecord
  belongs_to :user
  belongs_to :book

  enum status: %i[pending processing delivered favorite in_cart rent]
end
