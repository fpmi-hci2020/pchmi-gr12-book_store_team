class ChangePriceToIntInBooks < ActiveRecord::Migration[6.0]
  def change
    change_column(:books, :price, :integer)
  end
end
