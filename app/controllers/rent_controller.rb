class RentController < ApplicationController
  def index
    @current_user_id = current_user.id
  end
end
