class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :name
      t.integer :publishing_year
      t.integer :quantity
      t.timestamp :delivery_date

      t.timestamps
    end
  end
end
