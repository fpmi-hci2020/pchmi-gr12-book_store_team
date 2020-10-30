require 'rails_helper'

RSpec.describe IndexController, type: :controller do
  describe 'GET #index' do
    it 'runs tests successfully' do
      expect(2+2).to eq 4
    end
  end
end
