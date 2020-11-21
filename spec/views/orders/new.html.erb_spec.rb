require 'rails_helper'

RSpec.describe "orders/new", type: :view do
  before(:each) do
    assign(:order, Order.new(
      amount: 1,
      user: nil,
      book: nil
    ))
  end

  it "renders new order form" do
    render

    assert_select "form[action=?][method=?]", orders_path, "post" do

      assert_select "input[name=?]", "order[amount]"

      assert_select "input[name=?]", "order[user_id]"

      assert_select "input[name=?]", "order[book_id]"
    end
  end
end
