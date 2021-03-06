require 'rails_helper'

RSpec.describe "favorites/edit", type: :view do
  before(:each) do
    @favorite = assign(:favorite, Favorite.create!(
      book: nil,
      user: nil
    ))
  end

  it "renders the edit favorite form" do
    render

    assert_select "form[action=?][method=?]", favorite_path(@favorite), "post" do

      assert_select "input[name=?]", "favorite[book_id]"

      assert_select "input[name=?]", "favorite[user_id]"
    end
  end
end
