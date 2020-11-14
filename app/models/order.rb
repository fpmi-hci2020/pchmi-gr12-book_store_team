class Order < ApplicationRecord
  belongs_to :user
  belongs_to :book

  enum status: %i[pending processing delivered]
end
