class AddDescToBook < ActiveRecord::Migration[6.0]
  def change
    add_column :books, :description, :string
  end
end
