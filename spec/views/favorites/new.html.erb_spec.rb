require 'rails_helper'

RSpec.describe "favorites/new", type: :view do
  before(:each) do
    assign(:favorite, Favorite.new(
      book: nil,
      user: nil
    ))
  end

  it "renders new favorite form" do
    render

    assert_select "form[action=?][method=?]", favorites_path, "post" do

      assert_select "input[name=?]", "favorite[book_id]"

      assert_select "input[name=?]", "favorite[user_id]"
    end
  end
end
