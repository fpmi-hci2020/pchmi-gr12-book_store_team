class ChangePriceInBooks < ActiveRecord::Migration[6.0]
  def change
    change_column(:books, :price, :float)
  end
end
